import sentNewsArray from '../sentNews.json' assert { type: 'json' };
import { getElementDate, getRandomDelay, getThresholdDate } from "./timeFunctions.js";
import { scrapeNewsData } from "./scraper.js";
import stringSimilarity from "string-similarity";
import fs from 'fs';

const fileName = './sentNews.json';

export let getFirstTenNews = (fullNewsDataArray) => {
    return fullNewsDataArray.slice(0, 10);
}

export let getUniqueNews = async (URL) => {
    const newsDataArray = await scrapeNewsData(URL);

    const firstTenNewsArray = getFirstTenNews(newsDataArray);

    // Create a set of unique titles from the old items for efficient lookups
    const sentNewsTitlesSet = new Set(sentNewsArray.map(element => element.title));

    // Filter new items based on whether their title exists in the old items set
    const uniqueNewsArray = firstTenNewsArray.filter(newItem => {
        let oldTitleindex = 0;
        for (const oldTitle of sentNewsTitlesSet) {

            if (!(isNewerThanThresholdDate(newItem, 2))) {
                return false;
            }; // Not Unique if older than threshold date.

            if (isSimilarTitle(newItem.title, oldTitle, 0.98)) {
                return false;
            }; // Not unique if a title similarity is more than 0.98

            if (isSimilarTitle(newItem.title, oldTitle, 0.9)) {
                if (!(isNewerThanThresholdDate(sentNewsArray[oldTitleindex], 2))) {
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

    while (sentNewsArray.length >= 20) {
        sentNewsArray.shift()
    }

    sentNewsArray.push(newsElement);

    const sentNewsjsonString = JSON.stringify(sentNewsArray, null, 2);

    fs.writeFileSync(fileName, sentNewsjsonString);

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