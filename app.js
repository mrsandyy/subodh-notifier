import { startClient, sleep, sendMessageToId, verifyMessageInGroup, pingClient } from "./src/whatsapp.js";
import { getUniqueNews, updateSentNews } from "./src/news.js";
import { getRandomDelay } from "./src/timeFunctions.js";
import pQueue from 'p-queue';
import dotenv from 'dotenv';

dotenv.config();

const URL = process.env.URL;
const groupId = process.env.GROUP_ID;
const channelId = process.env.CHANNEL_ID;
const intervalBetweenScrapping = (process.env.INTERVAL_BETWEEN_SCRAPING * 60000); // Interval in mins * 60000 (one min in miliseconds)

async function main() {
    const waClient = await startClient();
    const queue = new pQueue({ concurrency: 1 });

    while (true) {
        try {
            console.log('Fetching new news...');
            const uniqueNewsArray = await getUniqueNews(URL);
            console.log(`Fetched ${uniqueNewsArray.length} new news items.`);

            const reversedNewsArray = uniqueNewsArray.reverse();

            for (const newsDataElement of reversedNewsArray) {
                queue.add(async () => {
                    let retries = 3;
                    let success = false;

                    const intervalBetweenMessages = getRandomDelay(30, 120) * 1000; // Delay in milliseconds

                    console.log(`Waiting ${intervalBetweenMessages / 1000} seconds before next message`);
                    await sleep(intervalBetweenMessages);

                    const messageContent = `*${newsDataElement.title}* \n\n Date: ${newsDataElement.date} \n\n Link: ${newsDataElement.link}`;

                    // Check if the message was already sent successfully
                    if (await verifyMessageInGroup(waClient, channelId, messageContent)) {
                        console.log(`Message already sent successfully: ${newsDataElement.title}`);
                        success = true;
                    } else {
                        while (retries > 0 && !success) {
                            try {
                                console.log(`Attempting to send news: ${newsDataElement.title}`);
                                success = await sendMessageToId(waClient, channelId, newsDataElement);
                                if (success) {
                                    console.log(`News sent successfully: ${newsDataElement.title}`);
                                } else {
                                    console.log(`Failed to send news: ${newsDataElement.title}, retries left: ${retries - 1}`);
                                    retries--;
                                    await sleep(intervalBetweenMessages); // Wait before retrying
                                }
                            } catch (error) {
                                console.error(`Error sending news: ${newsDataElement.title}`, error);
                                retries--;
                                await sleep(5000);
                            }
                        }
                    }

                    if (success) {
                        await updateSentNews(newsDataElement);
                        console.log(`Updated sent news status for: ${newsDataElement.title}`);
                    } else {
                        console.error(`Failed to send news after all retries: ${newsDataElement.title}`);
                    }
                });
            }

            console.log('Waiting for all messages to be processed...');
            await queue.onIdle();
            console.log(`Sleeping for ${intervalBetweenScrapping / 1000} seconds before next scrape`);
            await sleep(intervalBetweenScrapping);
            await pingClient(waClient);
        } catch (error) {
            console.error('Error in main loop:', error);
            console.log('Waiting 60 seconds before trying again...');
            await sleep(60000); // Wait a minute before trying again
        }
    }
}

main().catch(console.error);