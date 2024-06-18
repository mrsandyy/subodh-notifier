import { MongoStore } from 'wwebjs-mongo';
import mongoose from 'mongoose';
import qrcodeTerminal from 'qrcode-terminal';
import dotenv from 'dotenv';
import Whatsapp from 'whatsapp-web.js'
const { Client, RemoteAuth, Poll } = Whatsapp

dotenv.config();

const wwebVersion = '2.2412.54';
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
        webVersionCache: {
            type: 'remote',
            remotePath: `https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/${wwebVersion}.html`,
        },
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
            // Generate a random delay between 1 and 3 seconds (in milliseconds)
            const delay = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;

            // Use setTimeout to delay the reply
            setTimeout(() => {
                message.sendMessage(message.from, 'wassup');
            }, delay);
        }
    });

    await client.initialize();
    return client;
};

export const sendChannelMessage = async (client, channelId, newsDataElement) => {
    try {
        const message = newsDataElement.title;

        await client.sendMessage(channelId, message);

        console.log(`Successfully sent message to channel: ${message}`);
    } catch (error) {
        console.error('Error sending message to channel:', error);
    }
};

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}