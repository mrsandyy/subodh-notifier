import { Firestore } from '@google-cloud/firestore';
import dotenv from 'dotenv';

dotenv.config();

// Create a new Firestore instance
const firestore = new Firestore();

export const storeNewsData = async (newsData) => {
    const collection = firestore.collection('news');

    // Get a new write batch
    const batch = firestore.batch();

    // Loop through the newsData object and add a set operation to the batch for each news item
    for (const [title, data] of Object.entries(newsData)) {
        // Generate a random document ID
        const documentID = firestore.collection('_').doc().id;
        // Use the documentID as the argument for the doc method
        const document = collection.doc(documentID);

        // Add a set operation to the batch with the title, link and date fields
        batch.set(document, {
            title: title || "",
            link: data.link || "",
            date: data.date || ""
        });
    }

    // Commit the batch
    await batch.commit();

    // Log a success message
    console.log('News stored successfully');
};