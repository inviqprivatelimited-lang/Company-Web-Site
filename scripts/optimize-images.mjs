/**
 * Image optimization script for INVIQ website
 * Compresses public/*.jpeg files using jimp v1 API
 * Run with: node scripts/optimize-images.mjs
 */

import { Jimp, JimpMime } from "jimp";
import { readdir, stat, writeFile } from "fs/promises";
import { join, extname } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, "..", "public");

const JPEG_QUALITY = 75; // 0–100. 75 gives great quality at ~50-70% smaller file size.

async function optimizeImages() {
    const files = await readdir(PUBLIC_DIR);
    const images = files.filter((f) =>
        [".jpeg", ".jpg"].includes(extname(f).toLowerCase())
    );

    console.log(`\n🖼  Found ${images.length} JPEG images to optimize (quality=${JPEG_QUALITY}):\n`);

    let totalBefore = 0;
    let totalAfter = 0;

    for (const file of images) {
        const inputPath = join(PUBLIC_DIR, file);
        const { size: originalSize } = await stat(inputPath);
        totalBefore += originalSize;

        try {
            const image = await Jimp.read(inputPath);
            // Encode to JPEG buffer at target quality
            const compressed = await image.getBuffer(JimpMime.jpeg, { quality: JPEG_QUALITY });
            // Write back to same path (overwrites original)
            await writeFile(inputPath, compressed);

            const { size: newSize } = await stat(inputPath);
            totalAfter += newSize;

            const savedKB = ((originalSize - newSize) / 1024).toFixed(0);
            const savedPct = (((originalSize - newSize) / originalSize) * 100).toFixed(1);
            const sizeStr = `${(originalSize / 1024).toFixed(0)}KB → ${(newSize / 1024).toFixed(0)}KB`;
            const icon = newSize < originalSize ? "✅" : "➖";
            console.log(`  ${icon} ${file.padEnd(26)}  ${sizeStr.padEnd(20)}  -${savedKB}KB (${savedPct}%)`);
        } catch (err) {
            console.error(`  ❌ ${file}: ${err.message}`);
            totalAfter += originalSize;
        }
    }

    const savedKB = ((totalBefore - totalAfter) / 1024).toFixed(0);
    const savedMB = ((totalBefore - totalAfter) / 1024 / 1024).toFixed(2);
    console.log(`\n🎉 Done!  Saved ${savedKB} KB (${savedMB} MB)`);
    console.log(`   Before: ${(totalBefore / 1024 / 1024).toFixed(2)} MB  →  After: ${(totalAfter / 1024 / 1024).toFixed(2)} MB\n`);
}

optimizeImages().catch(console.error);
