import { startClient, sleep, sendMessageToId } from "./server/whatsapp.js";
import { getUniqueNews, updateSentNews } from "./server/news.js";
import { getRandomDelay } from "./server/timeFunctions.js";
import pQueue from 'p-queue';
import dotenv from 'dotenv';

dotenv.config();

const URL = process.env.URL;
const groupId = process.env.GROUP_ID;
const channelId = process.env.CHANNEL_ID;
const intervalBetweenScrapping = parseInt(process.env.INTERVAL_BETWEEN_SCRAPING, 10); // 10 mins

async function main() {
    const waClient = await startClient();
    const queue = new pQueue({ concurrency: 1 });

    while (true) {
        try {
            console.log('Fetching new news...');
            const uniqueNewsArray = await getUniqueNews(URL);
            console.log(`Fetched ${uniqueNewsArray.length} new news items.`);

            for (const newsDataElement of uniqueNewsArray) {
                queue.add(async () => {
                    let retries = 3;
                    let success = false;

                    while (retries > 0 && !success) {
                        try {
                            console.log(`Attempting to send news: ${newsDataElement.title}`);
                            success = await sendMessageToId(waClient, groupId, newsDataElement);
                            if (success) {
                                console.log(`News sent successfully: ${newsDataElement.title}`);
                                await updateSentNews(newsDataElement);
                                console.log(`Updated sent news status for: ${newsDataElement.title}`);
                            } else {
                                console.log(`Failed to send news: ${newsDataElement.title}, retries left: ${retries - 1}`);
                                retries--;
                                await sleep(5000); // Wait 5 seconds before retrying
                            }
                        } catch (error) {
                            console.error(`Error sending news: ${newsDataElement.title}`, error);
                            retries--;
                            await sleep(5000);
                        }
                    }

                    if (!success) {
                        console.error(`Failed to send news after all retries: ${newsDataElement.title}`);
                    }

                    const intervalBetweenMessages = getRandomDelay(30, 120) * 1000; // Convert to milliseconds
                    console.log(`Waiting ${intervalBetweenMessages / 1000} seconds before next message`);
                    await sleep(intervalBetweenMessages);
                });
            }

            console.log('Waiting for all messages to be processed...');
            await queue.onIdle();
            console.log(`Sleeping for ${intervalBetweenScrapping / 1000} seconds before next scrape`);
            await sleep(intervalBetweenScrapping);
        } catch (error) {
            console.error('Error in main loop:', error);
            console.log('Waiting 60 seconds before trying again...');
            await sleep(60000); // Wait a minute before trying again
        }
    }
}

main().catch(console.error);