import { startClient, sendChannelMessage, sleep } from "./server/whatsapp.js";
import { getUniqueNews, updateSentNews } from "./server/news.js";
import { getRandomDelay } from "./server/timeFunctions.js";
import dotenv from 'dotenv';

dotenv.config();

const URL = process.env.URL;
const channelId = process.env.CHANNEL_ID;
const sleepTime = 10 * 60 * 1000; // 10 mins

const waClient = await startClient();

while (true) {
    const uniqueNewsArray = await getUniqueNews(URL);

    for (const newsDataElement of uniqueNewsArray) {

        const randomDelay = getRandomDelay(10, 20);
        await sendChannelMessage(waClient, channelId, newsDataElement);

        await updateSentNews(newsDataElement);

        await sleep(randomDelay);

    }
    await sleep(sleepTime);
}