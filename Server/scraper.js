// Import the modules
import dotenv from 'dotenv';
import cheerio from 'cheerio';
import fs from 'fs/promises'; // Import the fs module with promises
import fetch from 'node-fetch'; // Import the fetch module

dotenv.config();

const URL = process.env.URL;
const newsDataJsonPath = process.env.newsDataJsonPath;

// Define an async function named scrapeNewsData
export const scrapeNewsData = async (url) => {
    try {
        // Make the request using fetch and await
        const response = await fetch(url);
        // Check for successful response
        if (response.status !== 200) {
            throw new Error(`Invalid status code: ${response.status}`);
        }
        // Get the HTML text from the response
        const html = await response.text();
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

        // Convert the newsData object to a plain JavaScript object using JSON.stringify and JSON.parse
        const newsDataPlain = JSON.parse(JSON.stringify(newsData));

        // Return the newsDataPlain object
        return newsDataPlain;

    } catch (error) {
        // Handle errors
        console.error(error);
    }
};
