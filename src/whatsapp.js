// This file includes software developed by the Whatsapp-web.js project,
// licensed under the Apache License 2.0. See the NOTICE file for details.

import { MongoStore } from 'wwebjs-mongo';
import mongoose from 'mongoose';
import qrcodeTerminal from 'qrcode-terminal';
import dotenv from 'dotenv';
import Whatsapp from 'whatsapp-web.js';
import { downloadAndConvertPdf } from './pdf.js';

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
        }),
        puppeteer: {
            args: ['--no-sandbox']
        }
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
            let imgPath = "";

            let credits = getCredits();
            let emoji = getEmojis();

            const formattingMessage = {
                "header": `*Latest Update:* ${title}`,
                "pdfInfo": `Blurry Image? Get PDF:\n> ${link}`,
                "mediaErr": "Error While Sending Pdf.",
                "link": `Check Out:\n> ${link}`,
                "date": `Fetched On: ${date}`,
                "credit": credits,
                "footer": `${emoji} Via *Subodh Notifier*`
            }

            if (link.toLowerCase().endsWith('.pdf')) {
                message = `${formattingMessage.header}\n\n> ${formattingMessage.pdfInfo}\n\n> ${formattingMessage.footer}`;

                imgPath = await downloadAndConvertPdf(link);

                const media = MessageMedia.fromFilePath(imgPath);

                try {
                    sentMessage = await client.sendMessage(chatId, media, { caption: message });
                } catch (error) {
                    message = `${formattingMessage.header}\n\n> ${formattingMessage.mediaErr}\n> ${formattingMessage.link}\n\n> ${formattingMessage.footer}`;
                    sentMessage = await client.sendMessage(chatId, message);             
                }

            } else if (link.toLowerCase().endsWith('notice_board')) {

                const randomNum = Math.random();

                if (randomNum < 7) { //change to 0.7 for random credits
                    message = `${formattingMessage.header}\n\n> ${formattingMessage.date}\n\n> ${formattingMessage.footer}`;
                } else {
                    message = `${formattingMessage.header}\n\n> ${formattingMessage.credit}\n\n> ${formattingMessage.footer}`;
                }

                sentMessage = await client.sendMessage(chatId, message);

            } else {
                message = `${formattingMessage.header}\n\n> ${formattingMessage.link}\n\n> ${formattingMessage.footer}`;
                sentMessage = await client.sendMessage(chatId, message);
            };

            console.log('Message sent, waiting to verify...');

            // Wait for the message to be processed
            await sleep(5000); // 5 Sec

            const isVerified = await verifyMessageInGroup(client, chatId, message);
            if (isVerified) {
                console.log('Message verified in group chat');
                resolve(true);
            } else {
                console.log('Message not found in group chat');
                resolve(false);
            }

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

export const getEmojis = () => {
    const emphasisEmojis = [
        "🌟",
        "✨",
        "🔥",
        "🎉",
        "🚀",
        "🥇",
        "📢",
        "💫",
        "❤️",
        "🖤",
        "🔔"
    ];

    const randomIndex = Math.floor(Math.random() * emphasisEmojis.length);
    return emphasisEmojis[randomIndex];
};

export const getCredits = () => {
    const creditArray = [
        "Wanna Support?\n> Follow `@mrsandyy_` & `@myself.dhairya`",
        "Made with 🖤 by `@mrsandyy_` & `@myself.dhairya`",
        "Crafted with care by `@mrsandyy_` & `@myself.dhairya`",
        "Designed and developed by `@mrsandyy_` & `@myself.dhairya`",
        "A joint effort by `@mrsandyy_` & `@myself.dhairya`",
        "Passionately crafted by `@mrsandyy_` & `@myself.dhairya`",
        "Feeling supportive?\n> Follow `@mrsandyy_` & `@myself.dhairya`"
    ];

    const randomIndex = Math.floor(Math.random() * creditArray.length);
    return creditArray[randomIndex];
};