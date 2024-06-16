import { startClient, sendChannelMessage, sleep } from "./server/whatsapp.js";
import { scrapeNewsData } from "./server/scraper.js";
import dotenv from 'dotenv';

dotenv.config();

const URL = process.env.URL;
const channelId = process.env.CHANNEL_ID;
const sleepTime = 10 * 60 * 1000; // 10 mins
const cooldownTime = 10 * 60 * 1000; // 10 mins

// const waClient = await startClient();

while (true) {
    let data = await scrapeNewsData(URL);

    const today = new Date();
    const thresholdDate = new Date(today.getTime() - (3 * 24 * 60 * 60 * 1000));  // 3 days in milliseconds

    for (const element of data) {
        const elementDate = new Date(element.date.split('/').reverse().join('-'));
        const randomDelay = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;

        console.log(randomDelay);

        if (elementDate > thresholdDate) {
            await sendChannelMessage(waClient, channelId, element.title);
        } else {
            console.log("Nuh Uh!");
        }
        await sleep(randomDelay);
    }
    await sleep(sleepTime);
}