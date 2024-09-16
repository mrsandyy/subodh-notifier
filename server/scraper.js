import fs from 'fs/promises';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { getCurrentDate } from "./timeFunctions.js";

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

        // Initialize an empty array to store the data
        const newsData = [];

        // Define a regular expression to match the date format
        const dateRegex = /\d{2}\/\d{2}\/\d{4}/;

        // Loop through the elements and extract the data
        commentItems.each((index, element) => {

            let newsTitle;
            let newsLink;
            let newsDate;

            try {
                // Get the news title
                newsTitle = $(element).find('b').text().trim();

                if (!newsTitle) {
                    throw new Error('No Title found.');
                };

                newsTitle = cleanText(newsTitle);

            } catch (e) {
                console.log(`Error extracting title for comment ${index + 1}: ${e}`);
                newsTitle = "Unable to retrieve title. Please visit the official website for the latest information. We are working on resolving this issue.";
            };

            try {
                // Get the news link
                newsLink = $(element).find('a').attr('href');

                if (!newsLink) {
                    throw new Error('No href attribute found');
                };

            } catch (e) {
                console.log(`Error extracting link for ${newsTitle}: ${e}`);
                newsLink = 'https://subodhpgcollege.com/notice_board';
            };

            try {
                // Get the news date from the h6 element
                const newsDateText = $(element).find('h6').text().trim();

                if (!newsDateText) {
                    throw new Error('No Date found.');
                };

                // Use the regular expression to extract the date
                const newsDateMatch = dateRegex.exec(newsDateText);
                // If there is a match, get the first element of the array
                newsDate = newsDateMatch ? newsDateMatch[0] : '';

            } catch (e) {
                console.log(`Error extracting date for ${newsTitle}: ${e}`);

                // If there's a previous news item, use its date
                if (index > 0 && newsData[index - 1].date) {
                    newsDate = newsData[index - 1].date;
                } else {
                    // If there's no previous item or it doesn't have a date, use today's date
                    newsDate = getCurrentDate();
                }

            };

            // Store the data in the dictionary with the title as the key
            let newsItem = {
                title: newsTitle,
                link: newsLink,
                date: newsDate
            };
            newsData.push(newsItem);
        });

        return newsData;

    } catch (error) {
        // Handle errors
        console.error(error);
    }
};

function cleanText(text) {
    return text
        .replace(/\s+/g, ' ')  // Replace all whitespace (including newlines) with a single space
        .trim(); // Remove leading and trailing whitespace
}