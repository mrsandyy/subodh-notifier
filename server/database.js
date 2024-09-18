import { Firestore } from '@google-cloud/firestore';
import dotenv from 'dotenv';

dotenv.config();

const firestore = new Firestore();

export const storeNewsData = async (newsData) => {
    const collection = firestore.collection('news');

    // Get a new write batch
    const batch = firestore.batch();

    // Loop through the newsData object and add a set operation to the batch for each news item
    for (const [title, data] of Object.entries(newsData)) {
        // Generate a random document ID
        const documentID = firestore.collection('_').doc().id;
        const document = collection.doc(documentID);

        batch.set(document, {
            title: title || "",
            link: data.link || "",
            date: data.date || ""
        });
    }

    await batch.commit();

    console.log('News stored successfully');
};