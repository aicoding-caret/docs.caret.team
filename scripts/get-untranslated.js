const fs = require('fs');
const path = require('path');

const languages = ['fr', 'de', 'ru'];
const docsDir = './docs-en';

function getFilesRecursive(dir, basePath = null) {
  if (!basePath) basePath = dir;
  let files = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files = files.concat(getFilesRecursive(fullPath, basePath));
    } else if (item.endsWith('.mdx')) {
      const relativePath = path.relative(basePath, fullPath);
      files.push(relativePath);
    }
  }

  return files;
}

function isTranslated(lang, file) {
  const filePath = `./docs-${lang}/${file}`;
  if (!fs.existsSync(filePath)) return false;

  const content = fs.readFileSync(filePath, 'utf8');
  const titleMatch = content.match(/^title:\s*["']([^"']+)["']/m);

  if (!titleMatch) return false;

  const title = titleMatch[1];

  // 프랑스어 문자
  if (lang === 'fr') {
    return /[àâäêéèëîïôöûüçœæÀÂÄÊÉÈËÎÏÔÖÛÜÇŒÆ]/.test(title);
  }
  // 독일어 문자
  if (lang === 'de') {
    return /[äöüßÄÖÜ]/.test(title);
  }
  // 러시아어 문자
  if (lang === 'ru') {
    return /[А-Яа-яЁё]/.test(title);
  }

  return false;
}

const enFiles = getFilesRecursive(docsDir);

const untranslated = {
  fr: [],
  de: [],
  ru: []
};

for (const file of enFiles) {
  for (const lang of languages) {
    if (!isTranslated(lang, file)) {
      untranslated[lang].push(file);
    }
  }
}

console.log('=== UNTRANSLATED FILES ===\n');
console.log(`French: ${untranslated.fr.length} files`);
console.log(`German: ${untranslated.de.length} files`);
console.log(`Russian: ${untranslated.ru.length} files`);
console.log(`\nTotal: ${untranslated.fr.length + untranslated.de.length + untranslated.ru.length} files\n`);

// 작업 로그에 저장할 목록 생성
const workLog = {
  timestamp: new Date().toISOString(),
  untranslated: untranslated,
  counts: {
    fr: untranslated.fr.length,
    de: untranslated.de.length,
    ru: untranslated.ru.length,
    total: untranslated.fr.length + untranslated.de.length + untranslated.ru.length
  }
};

fs.writeFileSync('work-logs/translation-todo.json', JSON.stringify(workLog, null, 2));
console.log('Saved to work-logs/translation-todo.json');
