---
description: Convert OG tag images to WebP format with 1200x630 resize. Use when adding new language OG images.
argument-hint: "<input-image> <output-webp>"
---

# OG Image Converter

Convert images to OG tag standard format (1200x630 WebP).

## Usage

```bash
# Navigate to skill directory
cd .agents/skills/og-image-converter

# Install dependencies (first time only)
npm install

# Run conversion
node convert.js <input-image> <output-webp>

# Example: Convert French image
node convert.js /path/to/source.jpg ../../../static/og/ogtag-fr.webp
```

## Batch Conversion

```bash
# Convert all JPEG/PNG in static/og folder to WebP
node convert.js --batch ../../../static/og
```

## Specifications
- Output size: 1200 x 630 px
- Format: WebP
- Quality: 85%
