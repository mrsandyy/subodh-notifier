import { startClient, sendChannelMessage, sleep } from "./server/whatsapp.js";
import { getRandomDelay } from "./server/extraFunc.js";
import dotenv from 'dotenv';
import { getUniqueNews } from "./server/news.js";

dotenv.config();

const URL = process.env.URL;
const channelId = process.env.CHANNEL_ID;
const sleepTime = 10 * 60 * 1000; // 10 mins

// const waClient = await startClient();

while (true) {
    const uniqueNewsArray = await getUniqueNews(URL);

    console.log(uniqueNewsArray);

    for (const newsDataElement of uniqueNewsArray) {

        const randomDelay = getRandomDelay(1, 10);
        // await sendChannelMessage(waClient, channelId, newsDataElement.title);
        await sleep(randomDelay);

    }
    await sleep(sleepTime);
}