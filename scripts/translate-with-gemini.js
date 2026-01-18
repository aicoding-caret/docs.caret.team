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
    docsDir: './docs-fr'
  },
  de: {
    name: 'German',
    code: 'de',
    targetLang: 'German',
    docsDir: './docs-de'
  },
  ru: {
    name: 'Russian',
    code: 'ru',
    targetLang: 'Russian',
    docsDir: './docs-ru'
  }
};

async function translateWithGemini(text, targetLang) {
  const model = client.getGenerativeModel({ model: 'gemini-3-flash-preview' });

  const prompt = `You are a professional technical translator. Translate the following MDX documentation from English to ${targetLang}.

IMPORTANT RULES:
1. Keep all technical terms in English: Caret, Cline, Claude, VS Code, MCP, TypeScript, Node.js, npm, git, API, etc.
2. Do NOT translate code blocks, command syntax, or file paths
3. Keep all Markdown structure (headings, lists, links, images) exactly the same
4. Keep YAML frontmatter structure unchanged, only translate title and description fields
5. For links like [text](/en/path), change /en/ to /${targetLang.toLowerCase()}/
6. Translate naturally and idiomatically in ${targetLang}

Text to translate:
\`\`\`
${text}
\`\`\`

Please provide ONLY the translated text, without any explanations or markdown code fences.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error(`Translation error for ${targetLang}:`, error.message);
    throw error;
  }
}

function isTranslated(lang, file) {
  const filePath = `./docs-${lang}/${file}`;
  if (!fs.existsSync(filePath)) return false;

  const content = fs.readFileSync(filePath, 'utf8');
  const titleMatch = content.match(/^title:\s*["']([^"']+)["']/m);

  if (!titleMatch) return false;

  const title = titleMatch[1];
  const enContent = fs.readFileSync(`./docs-en/${file}`, 'utf8');
  const enTitle = enContent.match(/^title:\s*["']([^"']+)["']/m)?.[1] || '';

  // 이전 파일과 현재 파일의 제목이 다르면 번역됨
  return title !== enTitle;
}

async function translateFile(sourceFile, targetLang, config) {
  const sourcePath = `./docs-en/${sourceFile}`;
  const targetPath = `${config.docsDir}/${sourceFile}`;

  // 디렉토리 생성
  const targetDir = path.dirname(targetPath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  console.log(`  Translating: ${sourceFile}`);

  const content = fs.readFileSync(sourcePath, 'utf8');

  try {
    const translated = await translateWithGemini(content, targetLang);
    fs.writeFileSync(targetPath, translated, 'utf8');
    return true;
  } catch (error) {
    console.error(`  Failed to translate ${sourceFile}: ${error.message}`);
    return false;
  }
}

async function getFilesToTranslate() {
  const enFiles = [];
  const basePath = './docs-en';

  function recurse(dir) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        recurse(fullPath);
      } else if (item.endsWith('.mdx')) {
        // Remove base path and normalize
        const relativePath = path.relative(basePath, fullPath);
        enFiles.push(relativePath);
      }
    }
  }

  recurse(basePath);
  return enFiles;
}

async function main() {
  const targetLang = process.argv[2] || 'fr';

  if (!languageConfig[targetLang]) {
    console.error(`Invalid language: ${targetLang}. Use: fr, de, ru`);
    process.exit(1);
  }

  const config = languageConfig[targetLang];
  console.log(`\n=== Starting ${config.name} Translation ===\n`);

  const allFiles = await getFilesToTranslate();
  const filesToTranslate = allFiles.filter(file => !isTranslated(targetLang, file));

  console.log(`Total files: ${allFiles.length}`);
  console.log(`Already translated: ${allFiles.length - filesToTranslate.length}`);
  console.log(`Files to translate: ${filesToTranslate.length}\n`);

  let successful = 0;
  let failed = 0;

  // 배치 처리: 한 번에 1개씩 번역 (API rate limiting 고려)
  for (let i = 0; i < filesToTranslate.length; i++) {
    const file = filesToTranslate[i];
    const isSuccess = await translateFile(file, config.targetLang, config);

    if (isSuccess) {
      successful++;
    } else {
      failed++;
    }

    // 진행 상황 출력
    if ((i + 1) % 5 === 0 || i === filesToTranslate.length - 1) {
      const progress = ((i + 1) / filesToTranslate.length * 100).toFixed(1);
      console.log(`  Progress: ${i + 1}/${filesToTranslate.length} (${progress}%)\n`);
    }

    // API rate limiting 방지
    if (i < filesToTranslate.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  console.log(`\n=== Translation Complete ===`);
  console.log(`Successful: ${successful}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total translated: ${successful}/${filesToTranslate.length}\n`);

  // 결과 저장
  const result = {
    timestamp: new Date().toISOString(),
    language: config.name,
    totalFiles: allFiles.length,
    alreadyTranslated: allFiles.length - filesToTranslate.length,
    filesToTranslate: filesToTranslate.length,
    successful,
    failed,
    translatedFiles: filesToTranslate.slice(0, successful)
  };

  fs.writeFileSync(`work-logs/translation-${targetLang}-${Date.now()}.json`, JSON.stringify(result, null, 2));
  console.log(`Results saved to work-logs/translation-${targetLang}-${Date.now()}.json`);
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
