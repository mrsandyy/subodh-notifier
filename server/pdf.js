import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import fetch from 'node-fetch';
import pdf2img from 'pdf-img-convert';

export const downloadAndConvertPdf = async (pdfUrl) => {
    try {
        const pdfDir = "./data/pdf";
        const imgDir = "./data/img";

        await fs.mkdir(pdfDir, { recursive: true });
        await fs.mkdir(imgDir, { recursive: true });

        // Clear existing files in the output folders
        for (const dir of [pdfDir, imgDir]) {
            const existingFiles = await fs.readdir(dir);
            for (const file of existingFiles) {
                await fs.unlink(path.join(dir, file));
            }
        }

        let pdfPath = "";
        let pdfName = pdfUrl.split("/").pop();

        if (!pdfName.toLowerCase().endsWith('.pdf')) {
            pdfName += '.pdf';
        }

        pdfPath = path.join(pdfDir, pdfName);

        // Download the PDF
        const response = await fetch(pdfUrl);
        const pdfBuffer = await response.arrayBuffer();
        await fs.writeFile(pdfPath, Buffer.from(pdfBuffer));

        // Convert PDF to image
        const outputImages = await pdf2img.convert(pdfPath, {
            width: 2048, // Increased resolution
            scale: 2,    // Scale factor for better quality
            base64: false
        });

        // Combine all images vertically
        const images = await Promise.all(outputImages.map(img =>
            sharp(img)
                .png()
                .toBuffer()
        ));

        const metadata = await sharp(images[0]).metadata();
        const combinedHeight = metadata.height * images.length;

        const combinedImage = await sharp({
            create: {
                width: metadata.width,
                height: combinedHeight,
                channels: 4,
                background: { r: 255, g: 255, b: 255, alpha: 1 }
            }
        })
            .composite(images.map((img, i) => ({
                input: img,
                top: i * metadata.height,
                left: 0
            })))
            .png()
            .toBuffer();

        const watermarkedImage = await sharp(combinedImage)
            .composite([{
                input: Buffer.from(`<svg width="${metadata.width}" height="${combinedHeight}">
                    <text x="${metadata.width - 10}" y="${combinedHeight - 10}" font-family="Arial" font-size="24" fill="red" text-anchor="end" opacity="0.7">
                        Via @mrsandyy_
                    </text>
                </svg>`),
                top: 0,
                left: 0,
            }])
            .png()
            .toBuffer();

        const pngPath = path.join(imgDir, `${pdfName.replace('.pdf', '.png')}`);
        await fs.writeFile(pngPath, watermarkedImage);

        return pngPath;
    } catch (error) {
        console.log(`Error while downloading and converting pdf: ${error}`);
        throw error;
    }
};