import { startClient, sleep, sendMessageToId } from "./server/whatsapp.js";
import { getUniqueNews, updateSentNews } from "./server/news.js";
import { getRandomDelay } from "./server/timeFunctions.js";
import dotenv from 'dotenv';

dotenv.config();

const URL = process.env.URL;
const groupId = process.env.GROUP_ID;
const channelId = process.env.CHANNEL_ID;
const intervalBetweenScrapping = process.env.INTERVAL_BETWEEN_SCRAPING; // 10 mins

const waClient = await startClient();

while (true) {
    const uniqueNewsArray = await getUniqueNews(URL);

    for (const newsDataElement of uniqueNewsArray) {

        await sendMessageToId(waClient, groupId, newsDataElement);

        await updateSentNews(newsDataElement);

        const intervalBetweenMessages = getRandomDelay(10, 20); // 10 to 20 seconds

        await sleep(intervalBetweenMessages);

    }
    await sleep(intervalBetweenScrapping);
}