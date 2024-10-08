import { getElementDate, getRandomDelay, getThresholdDate } from "./timeFunctions.js";
import { scrapeNewsData } from "./scraper.js";
import stringSimilarity from "string-similarity";
import dotenv from 'dotenv';
import fs from 'fs/promises';

dotenv.config();

const sentNewsFile = process.env.SENTNEWS_LOCATION; // Location of the sent news file.
const fetchedNewsAmount = process.env.FETCHED_NEWS_AMOUNT; // Number of how many news items will be fetched from top.
const sentNewsLimit = process.env.SENT_NEWS_LIMIT; // Number of items to keep in sentNews.json
const newNewsDaysThreshold = process.env.NEW_NEWS_DAYS_THRESHOLD; // Number of days accepted as new news from today. 

// High is for absolute limits on unique news.
// If the new news title is matching with existing sent News with more than High threshold it won't be considered unique. 
const titleSimilarityThresholdHigh = process.env.TITLE_SIMILARITY_THRESHOLD_HIGH;

// Low is for lowest similarity percentage to be considered not unique.
// If the new news title is matching with existing sent News title AND the old title is within newNewsDaysThreshold it won't be considered unique.
const titleSimilarityThresholdLow = process.env.TITLE_SIMILARITY_THRESHOLD_LOW;

export let getUniqueNews = async (URL) => {
    const newsDataArray = await scrapeNewsData(URL);

    const slicedNewsArray = newsDataArray.slice(0, fetchedNewsAmount);

    // Read the latest data from the file
    const sentNewsArray = await readSentNewsArray();

    // Create a set of unique titles from the old items for efficient lookups
    const sentNewsTitlesSet = new Set(sentNewsArray.map(element => element.title));

    // Filter new items based on whether their title exists in the old items set
    const uniqueNewsArray = slicedNewsArray.filter(newItem => {
        let oldTitleindex = 0;
        for (const oldTitle of sentNewsTitlesSet) {

            if (!(isNewerThanThresholdDate(newItem, newNewsDaysThreshold))) {
                return false;
            }; // Not Unique if older than threshold date.

            if (isSimilarTitle(newItem.title, oldTitle, titleSimilarityThresholdHigh)) {
                return false;
            }; // Not unique if a title similarity is more than 0.98

            if (isSimilarTitle(newItem.title, oldTitle, titleSimilarityThresholdLow)) {
                if (!(isNewerThanThresholdDate(sentNewsArray[oldTitleindex], newNewsDaysThreshold))) {
                    return true; // Unique if title is similar ( between 0.9 to 0.98) to old title but the old update is older than threshold date.
                } else {
                    return false;
                } // Not unique if a similar title exists and is not newer than 2 days
            };

            oldTitleindex++;
        }
        return true; // Unique if no similar title found
    });

    return uniqueNewsArray;
};

export let updateSentNews = async (newsElement) => {

    let sentNewsArray = await readSentNewsArray();

    while (sentNewsArray.length >= sentNewsLimit) {
        sentNewsArray.shift()
    }

    sentNewsArray.push(newsElement);

    const sentNewsjsonString = JSON.stringify(sentNewsArray, null, 2);

    try {
        await fs.writeFile(sentNewsFile, sentNewsjsonString);
        console.log('File written successfully!');
    } catch (error) {
        console.error('Error writing file:', error);
    }

};

let isSimilarTitle = (title1, title2, threshold) => {
    const similarity = stringSimilarity.compareTwoStrings(title1, title2);
    return similarity > threshold;
};

let isNewerThanThresholdDate = (element, days) => {

    const elementDate = getElementDate(element);
    const thresholdDate = getThresholdDate(days);

    return elementDate > thresholdDate;
};

let readSentNewsArray = async () => {
    try {
        const data = await fs.readFile(sentNewsFile, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading sent news file:', error);
        return [];
    }
}