const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Try to load .env if it exists
try {
  if (fs.existsSync('.env')) {
    require('dotenv').config();
  }
} catch (e) {
  // Ignore if dotenv fails
}

const apiKey = process.env.GEMINI_TOKEN || process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error('Error: GEMINI_TOKEN or GEMINI_API_KEY environment variable not set');
  process.exit(1);
}

const client = new GoogleGenerativeAI(apiKey);

const languageConfig = {
  fr: {
    name: 'French',
    code: 'fr',
    targetLang: 'French',
    docsDir: './docs-fr',
    charPattern: /[àâäêéèëîïôöûüçœæÀÂÄÊÉÈËÎÏÔÖÛÜÇŒÆ]/
  },
  de: {
    name: 'German',
    code: 'de',
    targetLang: 'German',
    docsDir: './docs-de',
    charPattern: /[äöüßÄÖÜ]/
  },
  ru: {
    name: 'Russian',
    code: 'ru',
    targetLang: 'Russian',
    docsDir: './docs-ru',
    charPattern: /[А-Яа-яЁё]/
  }
};

async function translateTitle(title, targetLang) {
  const model = client.getGenerativeModel({ model: 'gemini-3-flash-preview' });

  const prompt = `Translate this documentation title to ${targetLang}:
"${title}"

Rules:
- Keep technical terms (API, CLI, OAuth, Caret, Cline, Claude, VS Code, MCP, TypeScript, Node.js, npm, git, etc.)
- Keep simple/short words in English if they are technical terms (e.g., "Plan", "Act", "Model", "Provider")
- Natural translation for rest
- Return ONLY the translated title, no explanation or quotes
- Do not add markdown formatting`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim().replace(/^["']|["']$/g, '');
  } catch (error) {
    console.error(`Translation error for title "${title}":`, error.message);
    throw error;
  }
}

function updateTitleInFile(filePath, newTitle) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Escape double quotes in title
  const escapedTitle = newTitle.replace(/"/g, '\\"');

  // Replace title in frontmatter
  content = content.replace(
    /^(---[\s\S]*?title:\s*)["']([^"']+)["']/m,
    `$1"${escapedTitle}"`
  );

  fs.writeFileSync(filePath, content, 'utf8');
}

function getUntranslatedFiles(lang, config) {
  const docsDir = config.docsDir;
  const enDir = './docs-en';
  const files = [];

  function recurse(dir, basePath) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        recurse(fullPath, basePath);
      } else if (item.endsWith('.mdx')) {
        const relativePath = path.relative(basePath, fullPath);
        files.push(relativePath);
      }
    }
  }

  recurse(enDir, enDir);

  // Filter: only files where title doesn't have language-specific characters
  return files.filter(file => {
    const filePath = `${docsDir}/${file}`;
    if (!fs.existsSync(filePath)) return false;

    const content = fs.readFileSync(filePath, 'utf8');
    const titleMatch = content.match(/^title:\s*["']([^"']+)["']/m);

    if (!titleMatch) return false;

    const title = titleMatch[1];
    return !config.charPattern.test(title);
  });
}

async function main() {
  const lang = process.argv[2];

  if (!['fr', 'de', 'ru'].includes(lang)) {
    console.error('Usage: node scripts/fix-titles.js [fr|de|ru]');
    process.exit(1);
  }

  const config = languageConfig[lang];
  console.log(`\n=== Fixing ${config.name} Titles ===\n`);

  const files = getUntranslatedFiles(lang, config);
  console.log(`Files to process: ${files.length}\n`);

  let successful = 0;
  let failed = 0;
  const failedFiles = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = `${config.docsDir}/${file}`;

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const titleMatch = content.match(/^title:\s*["']([^"']+)["']/m);

      if (!titleMatch) {
        console.log(`  [${i + 1}/${files.length}] ⊘ ${file} (no title found, skipped)`);
        continue;
      }

      const oldTitle = titleMatch[1];
      console.log(`  [${i + 1}/${files.length}] ${file}`);
      console.log(`    Original: "${oldTitle}"`);

      const newTitle = await translateTitle(oldTitle, config.targetLang);
      console.log(`    → "${newTitle}"`);

      updateTitleInFile(filePath, newTitle);
      successful++;

      // API rate limiting
      if (i < files.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    } catch (error) {
      console.error(`  ✗ Failed: ${error.message}`);
      failed++;
      failedFiles.push(file);
    }

    if ((i + 1) % 10 === 0 || i === files.length - 1) {
      const progress = ((i + 1) / files.length * 100).toFixed(1);
      console.log(`  Progress: ${i + 1}/${files.length} (${progress}%)\n`);
    }
  }

  console.log(`\n=== Complete ===`);
  console.log(`Successful: ${successful}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total: ${files.length}\n`);

  // 결과 저장
  const result = {
    timestamp: new Date().toISOString(),
    language: config.name,
    languageCode: lang,
    totalFiles: files.length,
    successful,
    failed,
    failedFiles
  };

  fs.writeFileSync(
    `work-logs/fix-titles-${lang}-${Date.now()}.json`,
    JSON.stringify(result, null, 2)
  );
  console.log(`Results saved to work-logs/fix-titles-${lang}-${Date.now()}.json`);
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
