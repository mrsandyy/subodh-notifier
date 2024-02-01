// Import the modules
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs'); // Import the fs module

const newsDataJson = "newsData.json";

// Define a function named scrapeNewsData
function scrapeNewsData(url) {
    // Make the request
    request(url, (error, response, html) => {
        // Check for errors
        if (error) {
            console.error(error);
            return;
        }
        // Check for successful response
        if (response.statusCode !== 200) {
            console.error(`Invalid status code: ${response.statusCode}`);
            return;
        }
        // Load the HTML into cheerio
        const $ = cheerio.load(html);

        // Find the target elements
        const commentList = $('ul.list_none.comment_list');
        const commentItems = commentList.find('li.comment_info');

        // Initialize an empty dictionary to store the data
        const newsData = {};

        // Define a regular expression to match the date format
        const dateRegex = /\d{2}\/\d{2}\/\d{4}/;

        // Loop through the elements and extract the data
        commentItems.each((index, element) => {
            // Get the news title
            const newsTitle = $(element).find('b').text().trim();
            // Get the news link
            const newsLink = $(element).find('a').attr('href');
            // Get the news date from the h6 element
            const newsDateText = $(element).find('h6').text().trim();
            // Use the regular expression to extract the date
            const newsDateMatch = dateRegex.exec(newsDateText);
            // If there is a match, get the first element of the array
            const newsDate = newsDateMatch ? newsDateMatch[0] : '';
            // Store the data in the dictionary with the title as the key
            newsData[newsTitle] = {
                link: newsLink,
                date: newsDate
            };
        });

        // Write the dictionary to the JSON file
        fs.writeFile(newsDataJson, JSON.stringify(newsData), (err) => {
            // Check for errors
            if (err) {
                console.error(err);
                return;
            }
            // Success message
            console.log(`Saved data to ${newsDataJson}`);
        });
    });
}

// Call the function with a URL and a file name
scrapeNewsData("https://subodhpgcollege.com/notice_board");

