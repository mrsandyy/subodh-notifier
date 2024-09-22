import fetch from 'node-fetch';
import fs from 'fs/promises';
import path from 'path';

export const downloadPdf = async (pdfUrl) => {
    try {
        const pdfDir = "./pdf";

        await fs.mkdir(pdfDir, { recursive: true });

        // Clear existing images in the output folder
        const existingFiles = await fs.readdir(pdfDir);
        for (const file of existingFiles) {
            if (file.toLowerCase().endsWith('.pdf')) {
                await fs.unlink(path.join(pdfDir, file));
            }
        }

        let pdfPath = "";

        if (pdfUrl.toLowerCase().endsWith('.pdf')) {
            let pdfName = pdfUrl.split("/").pop();
            pdfPath = `${pdfDir}/${pdfName}`;
        } else {
            let pdfName = pdfUrl.split("/").pop();
            pdfPath = `${pdfDir}/${pdfName}.pdf`;
        };

        // Download the PDF
        const response = await fetch(pdfUrl);
        const pdfBuffer = await response.arrayBuffer();
        await fs.writeFile(pdfPath, Buffer.from(pdfBuffer));

        return pdfPath;
    } catch (error) {
        console.log(`Error while downloading pdf: ${error}`);
    };
};