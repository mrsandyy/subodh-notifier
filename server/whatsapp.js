import { MongoStore } from 'wwebjs-mongo';
import mongoose from 'mongoose';
import qrcodeTerminal from 'qrcode-terminal';
import dotenv from 'dotenv';
import Whatsapp from 'whatsapp-web.js';
import { downloadPdf } from './pdf.js';

const { Client, RemoteAuth, MessageMedia } = Whatsapp

dotenv.config();

const mongoUri = process.env.MONGODB_URI;

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export const startClient = async () => {
    await connectToMongo();

    const store = new MongoStore({ mongoose });

    const client = new Client({
        authStrategy: new RemoteAuth({
            store,
            backupSyncIntervalMs: 300000,
        })
    });

    client.on('qr', (qr) => {
        console.log('Scan the QR code to login:');
        qrcodeTerminal.generate(qr, { small: true });
    });

    const clientReadyPromise = new Promise((resolve) => {
        client.on('ready', async () => {
            console.log('Logged in successfully!');
            resolve(client);
        });
    });

    client.on('message_create', message => {
        if (message.body.toLowerCase() === 'hi') {
            const delay = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;
            setTimeout(() => {
                client.sendMessage(message.from, 'wassup');
            }, delay);
        }
    });

    await client.initialize();
    await clientReadyPromise;

    return client;
};

export const pingClient = async (client) => {
    try {
        // Perform a "ping" to keep the connection alive
        await client.getState();
        console.log('Keep-alive ping successful');
    } catch (error) {
        console.error('Error during keep-alive ping:', error);
        // Attempt to reinitialize the client if the ping fails
        try {
            await client.initialize();
            console.log('Client reinitialized successfully');
        } catch (reinitError) {
            console.error('Failed to reinitialize client:', reinitError);
        }
    }
};

export const sendMessageToId = async (client, chatId, newsDataElement) => {
    return new Promise(async (resolve, reject) => {
        try {
            const title = newsDataElement.title;
            const link = newsDataElement.link;
            const date = newsDataElement.date;

            let message = "";
            let sentMessage = null;
            let pdfPath = "";

            if (link.toLowerCase().endsWith('.pdf')) {
                message = `*Latest Update:* ${title}\n\n\n> ${link}\n\n\n> ✨ Via *Subodh Notifier*`;

                pdfPath = await downloadPdf(link);

                const media = MessageMedia.fromFilePath(pdfPath);
                sentMessage = await client.sendMessage(chatId, media, { caption: message });

            } else if (link.toLowerCase().endsWith('notice_board')) {
                message = `*Latest Update:* ${title}\n\n\n> ${link}\n\n\n> ✨ Via *Subodh Notifier*`;
                sentMessage = await client.sendMessage(chatId, message);
            } else {
                message = `*Latest Update:* ${title}\n\n\n> ${link}\n\n\n> ✨ Via *Subodh Notifier*`;
                sentMessage = await client.sendMessage(chatId, message);
            };

            let isResolved = false;

            const ackListener = async (ack) => {
                if (ack.id._serialized === sentMessage.id._serialized) {
                    if (!isResolved) {
                        isResolved = true;
                        client.removeListener('message_ack', ackListener);
                        clearTimeout(timeoutId);
                        if (ack.ack > 0) {
                            console.log(`Message delivered (ack ${ack.ack}): ${message}`);

                            // Additional verification step
                            const isVerified = await verifyMessageInGroup(client, chatId, message);
                            if (isVerified) {
                                console.log(`Message verified in group chat: ${message}`);
                                resolve(true);
                            } else {
                                console.log(`Message not found in group chat: ${message}`);
                                resolve(false);
                            }
                        } else {
                            console.log(`Message not delivered (ack 0): ${message}`);
                            resolve(false);
                        }
                    }
                }
            };

            client.on('message_ack', ackListener);

            const timeoutId = setTimeout(() => {
                if (!isResolved) {
                    isResolved = true;
                    client.removeListener('message_ack', ackListener);
                    console.log(`No ack received for message: ${message}`);
                    resolve(false);
                }
            }, 30000); // 30 seconds timeout

        } catch (error) {
            console.error('Error sending message:', error);
            reject(error);
        }
    });
};

export const verifyMessageInGroup = async (client, chatId, messageContent) => {
    try {
        const chat = await client.getChatById(chatId);
        const messages = await chat.fetchMessages({ limit: 50 }); // Fetch last 50 messages

        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

        const foundMessage = messages.find(msg =>
            msg.body === messageContent &&
            new Date(msg.timestamp * 1000) >= fiveMinutesAgo
        );

        return !!foundMessage;
    } catch (error) {
        console.error('Error verifying message in group:', error);
        return false;
    }
};

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}