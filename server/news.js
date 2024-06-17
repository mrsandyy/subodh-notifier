import sentNewsArray from '../sentNews.json' assert { type: 'json' };
import { getElementDate, getRandomDelay, getThresholdDate } from "./extraFunc.js";
import { scrapeNewsData } from "./scraper.js";
import stringSimilarity from "string-similarity";
import fs from 'fs';

const fileName = '../sentNews.json';

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
            if (isSimilarTitle(newItem.title, oldTitle, 0.98)) {
                return false; // Not unique if a title similarity is more than 0.98
            } else if (isSimilarTitle(newItem.title, oldTitle, 0.9)) {
                if (!(isNewerThanThresholdDate(sentNewsArray[oldTitleindex], 2)) && (isNewerThanThresholdDate(newItem, 2))) {
                    return true; // Unique if title is same but the update is 2 days apart.
                } else {
                    return false;
                } // Not unique if a similar title exists and is not newer than 2 days
            }
            oldTitleindex++;
        }
        return true; // Unique if no similar title found
    });

    console.log(uniqueNewsArray);
    return uniqueNewsArray;
};

export let updateSentNews = (newsElement) => {

    if (sentNewsArray.length > 20) {
        sentNewsArray.shift()
    }

    sentNewsArray.push(newsElement);

    const sentNewsjsonString = JSON.stringify(sentNewsArray, null, 2);

    fs.writeFile(fileName, sentNewsjsonString, (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('sentNews.json Updated successfully!');
        }
    });

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