#!/usr/bin/env node
/**
 * Replace hardcoded brand names with BrandName component in MDX files
 * - Skips frontmatter, code blocks, URLs, and already-replaced content
 */

const fs = require('fs');
const path = require('path');

// Korean particle replacements (order matters - longer patterns first)
const koReplacements = [
  // With particles (longer patterns first)
  ['캐러티에서', '<BrandName particle="from" />'],
  ['캐러티란', '<BrandName particle="topicQuestion" />'],
  ['캐러티는', '<BrandName particle="topic" />'],
  ['캐러티가', '<BrandName particle="subject" />'],
  ['캐러티를', '<BrandName particle="object" />'],
  ['캐러티와', '<BrandName particle="and" />'],
  ['캐러티의', '<BrandName particle="of" />'],
  ['캐러티로', '<BrandName particle="to" />'],
  ['캐러티에', '<BrandName particle="at" />'],
  ['캐러티도', '<BrandName particle="also" />'],
  ['캐러티만', '<BrandName particle="only" />'],

  // Legacy 캐럿 with particles
  ['캐럿에서', '<BrandName particle="from" />'],
  ['캐럿이란', '<BrandName particle="topicQuestion" />'],
  ['캐럿은', '<BrandName particle="topic" />'],
  ['캐럿이', '<BrandName particle="subject" />'],
  ['캐럿을', '<BrandName particle="object" />'],
  ['캐럿과', '<BrandName particle="and" />'],
  ['캐럿의', '<BrandName particle="of" />'],
  ['캐럿으로', '<BrandName particle="to" />'],
  ['캐럿에', '<BrandName particle="at" />'],
  ['캐럿도', '<BrandName particle="also" />'],
  ['캐럿만', '<BrandName particle="only" />'],

  // Plain brand names (do these last)
  ['캐러티', '<BrandName />'],
  ['캐럿', '<BrandName />'],
];

// English/Japanese/Chinese replacements
const otherReplacements = [
  ['Careti', '<BrandName />'],
  ['Caret', '<BrandName />'],
];

function shouldSkipReplacement(content, index, pattern) {
  // Check if we're inside a URL (look for common URL patterns around the match)
  const before = content.substring(Math.max(0, index - 100), index);
  const after = content.substring(index + pattern.length, index + pattern.length + 100);

  // Skip if in URL path (after / or before /)
  if (/\/[a-z-]*$/.test(before) || /^[a-z-]*\//.test(after)) {
    return true;
  }

  // Skip if in markdown link URL: [text](URL)
  if (/\]\([^)]*$/.test(before)) {
    return true;
  }

  // Skip if in image alt or src
  if (/!\[[^\]]*$/.test(before) || /src\s*=\s*["'][^"']*$/.test(before)) {
    return true;
  }

  // Skip if in HTML attribute
  if (/\w+\s*=\s*["'][^"']*$/.test(before)) {
    return true;
  }

  // Skip if already a BrandName component
  if (/<BrandName[^>]*>\s*$/.test(before)) {
    return true;
  }

  // Skip if in GitHub URL
  if (/github\.com[^\s]*$/.test(before) || /aicoding-caret/.test(before + pattern + after.substring(0, 20))) {
    return true;
  }

  // Skip if domain name (careti.ai, docs.careti.ai, etc.)
  if (/\.ai\s*$/.test(before + pattern) || /^[a-z]*\.ai/.test(pattern + after)) {
    return true;
  }

  // Skip if in badge URL (shields.io)
  if (/shields\.io/.test(before) || /badge/.test(before)) {
    return true;
  }

  return false;
}

function processContent(content, replacements, isKorean) {
  // Split content into sections: frontmatter, code blocks, and regular content
  const lines = content.split('\n');
  let inFrontmatter = false;
  let frontmatterCount = 0;
  let inCodeBlock = false;
  let result = [];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Track frontmatter
    if (line.trim() === '---') {
      frontmatterCount++;
      if (frontmatterCount === 1) {
        inFrontmatter = true;
      } else if (frontmatterCount === 2) {
        inFrontmatter = false;
      }
      result.push(line);
      continue;
    }

    // Track code blocks
    if (line.trim().startsWith('```') || line.trim().startsWith('~~~')) {
      inCodeBlock = !inCodeBlock;
      result.push(line);
      continue;
    }

    // Skip replacements in frontmatter or code blocks
    if (inFrontmatter || inCodeBlock) {
      result.push(line);
      continue;
    }

    // Apply replacements
    for (const [pattern, replacement] of replacements) {
      let searchIndex = 0;
      while (true) {
        const index = line.indexOf(pattern, searchIndex);
        if (index === -1) break;

        if (!shouldSkipReplacement(line, index, pattern)) {
          line = line.substring(0, index) + replacement + line.substring(index + pattern.length);
          searchIndex = index + replacement.length;
        } else {
          searchIndex = index + pattern.length;
        }
      }
    }

    result.push(line);
  }

  return result.join('\n');
}

function processFile(filePath, isKorean) {
  const content = fs.readFileSync(filePath, 'utf8');
  const replacements = isKorean ? koReplacements : otherReplacements;
  const newContent = processContent(content, replacements, isKorean);

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    return true;
  }
  return false;
}

function processDirectory(dir, isKorean) {
  let count = 0;
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      count += processDirectory(fullPath, isKorean);
    } else if (file.name.endsWith('.mdx')) {
      if (processFile(fullPath, isKorean)) {
        console.log(`Updated: ${fullPath}`);
        count++;
      }
    }
  }

  return count;
}

// Main execution
const args = process.argv.slice(2);
const targetDir = args[0] || '.';
const isKorean = args[1] === 'ko';

console.log(`Processing ${targetDir} (Korean: ${isKorean})`);
const count = processDirectory(targetDir, isKorean);
console.log(`\nTotal files updated: ${count}`);
