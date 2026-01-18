#!/usr/bin/env node

import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const QUALITY = 85;

async function convertImage(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .resize(OG_WIDTH, OG_HEIGHT, {
        fit: 'cover',
        position: 'center'
      })
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    const stats = await stat(outputPath);
    console.log(`✓ Converted: ${basename(outputPath)} (${Math.round(stats.size / 1024)}KB)`);
    return true;
  } catch (error) {
    console.error(`✗ Failed: ${inputPath} - ${error.message}`);
    return false;
  }
}

async function batchConvert(directory) {
  const files = await readdir(directory);
  const imageExts = ['.jpg', '.jpeg', '.png', '.gif', '.tiff', '.bmp'];

  let converted = 0;
  let failed = 0;

  for (const file of files) {
    const ext = extname(file).toLowerCase();
    const filePath = join(directory, file);

    // Skip if already webp or not an image
    if (ext === '.webp' || !imageExts.includes(ext)) continue;

    // Check if it's actually not a webp (misnamed file)
    const fileStats = await stat(filePath);
    if (!fileStats.isFile()) continue;

    const outputName = basename(file, ext) + '.webp';
    const outputPath = join(directory, outputName);

    const success = await convertImage(filePath, outputPath);
    if (success) converted++;
    else failed++;
  }

  console.log(`\nBatch complete: ${converted} converted, ${failed} failed`);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
OG Image Converter - Convert images to 1200x630 WebP

Usage:
  node convert.js <input> <output>     Convert single image
  node convert.js --batch <directory>  Convert all images in directory

Examples:
  node convert.js photo.jpg og-image.webp
  node convert.js --batch ../../../static/og
`);
    process.exit(0);
  }

  if (args[0] === '--batch') {
    if (!args[1]) {
      console.error('Error: Please specify directory for batch conversion');
      process.exit(1);
    }
    await batchConvert(args[1]);
  } else {
    if (args.length < 2) {
      console.error('Error: Please specify both input and output paths');
      process.exit(1);
    }
    await convertImage(args[0], args[1]);
  }
}

main().catch(console.error);
