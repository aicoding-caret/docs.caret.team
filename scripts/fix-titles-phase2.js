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
    charPattern: /[àâäêéèëîïôöûüçœæÀÂÄÊÉÈËÎÏÔÖÛÜÇŒÆ]/,
    accentExamples: 'Installation, Modèle, Fonction, Développement, Gestion, Intégration, Exécution, Authentification'
  },
  de: {
    name: 'German',
    code: 'de',
    targetLang: 'German',
    docsDir: './docs-de',
    charPattern: /[äöüßÄÖÜ]/,
    accentExamples: 'Einrichtung, Modell, Funktion, Entwicklung, Verwaltung, Integration, Ausführung, Authentifizierung'
  },
  ru: {
    name: 'Russian',
    code: 'ru',
    targetLang: 'Russian',
    docsDir: './docs-ru',
    charPattern: /[А-Яа-яЁё]/,
    accentExamples: 'Установка, Модель, Функция, Разработка, Управление, Интеграция, Исполнение, Аутентификация'
  }
};

async function translateTitle(title, targetLang, config) {
  const model = client.getGenerativeModel({ model: 'gemini-3-flash-preview' });

  const prompt = `Translate this documentation title to ${targetLang}:
"${title}"

CRITICAL RULES:
1. Keep technical terms (API, CLI, OAuth, Caret, Cline, Claude, VS Code, MCP, TypeScript, Node.js, npm, git, etc.) in English
2. Translate the REST naturally and idiomatically in ${targetLang}
3. MUST INCLUDE language-specific characters:
   ${config.code === 'fr' ? '- French accents: à, â, é, è, ê, ë, ç, ô, ù, û, ü, œ, æ' : ''}
   ${config.code === 'de' ? '- German umlauts: ä, ö, ü, ß' : ''}
   ${config.code === 'ru' ? '- Cyrillic characters: А-Яа-яЁё' : ''}
4. Examples of properly translated titles with required characters:
   ${config.accentExamples}

Return ONLY the translated title, no explanation or quotes.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const translated = response.text().trim().replace(/^["']|["']$/g, '');

    // Check if translation includes required characters
    if (!config.charPattern.test(translated)) {
      console.log(`    ⚠️  Translation lacks language-specific characters: "${translated}"`);
    }

    return translated;
  } catch (error) {
    console.error(`Translation error for title "${title}":`, error.message);
    throw error;
  }
}

function updateTitleInFile(filePath, newTitle) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace title in frontmatter
  content = content.replace(
    /^(---[\s\S]*?title:\s*)["']([^"']+)["']/m,
    `$1"${newTitle}"`
  );

  fs.writeFileSync(filePath, content, 'utf8');
}

function getFilesNeedingAccents(lang, config) {
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

  // Filter: only files where title lacks language-specific characters
  return files.filter(file => {
    const filePath = `${docsDir}/${file}`;
    if (!fs.existsSync(filePath)) return false;

    const content = fs.readFileSync(filePath, 'utf8');
    const titleMatch = content.match(/^title:\s*["']([^"']+)["']/m);

    if (!titleMatch) return false;

    const title = titleMatch[1];
    // Return true if title doesn't have language-specific characters
    return !config.charPattern.test(title);
  });
}

async function main() {
  const lang = process.argv[2];

  if (!['fr', 'de', 'ru'].includes(lang)) {
    console.error('Usage: node scripts/fix-titles-phase2.js [fr|de|ru]');
    process.exit(1);
  }

  const config = languageConfig[lang];
  console.log(`\n=== Phase 2: Adding Language-Specific Characters to ${config.name} Titles ===\n`);

  const files = getFilesNeedingAccents(lang, config);
  console.log(`Files needing accent/character addition: ${files.length}\n`);

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

      const newTitle = await translateTitle(oldTitle, config.targetLang, config);
      console.log(`    → "${newTitle}"`);

      if (config.charPattern.test(newTitle)) {
        console.log(`    ✓ Has ${config.code.toUpperCase()} characters`);
      } else {
        console.log(`    ⚠️  Still missing ${config.code.toUpperCase()} characters`);
      }

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
    phase: 2,
    totalFiles: files.length,
    successful,
    failed,
    failedFiles
  };

  fs.writeFileSync(
    `work-logs/fix-titles-phase2-${lang}-${Date.now()}.json`,
    JSON.stringify(result, null, 2)
  );
  console.log(`Results saved to work-logs/fix-titles-phase2-${lang}-${Date.now()}.json`);
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
