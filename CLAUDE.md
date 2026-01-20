# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **multilingual Docusaurus documentation site** for Careti AI Coding Assistant, supporting 4 languages (English, Korean, Japanese, Chinese). The site is built on Docusaurus v3.8.1 with a multi-instance architecture where each language has its own docs plugin instance.

**Key Architecture Points:**
- Multi-instance Docusaurus setup (not i18n) - each language is a separate docs plugin
- Language-specific documentation folders: `docs-en/`, `docs-ko/`, `docs-ja/`, `docs-zh/`
- Language-specific sidebar configurations: `sidebars-en.ts`, `sidebars-ko.ts`, etc.
- Custom landing page at `/` with language selection cards
- Route structure: `/en/`, `/ko/`, `/ja/`, `/zh/` for each language

## Development Commands

### Core Development
```bash
npm start          # Start development server (all languages available)
npm run build      # Build production site (all languages)
npm run serve      # Serve built site locally
npm run clear      # Clear Docusaurus cache
npm run typecheck  # TypeScript type checking
```

### Language-Specific Development
The README mentions language-specific commands, but they appear to be documentation examples rather than actual implemented scripts:
```bash
# These are mentioned in README but may need to be set up:
npm run start:en   # Would start English docs only
npm run start:ko   # Would start Korean docs only  
npm run start:ja   # Would start Japanese docs only
npm run start:zh   # Would start Chinese docs only
```

## Repository Structure

```
├── docs-en/          # English documentation (Markdown/MDX)
├── docs-ko/          # Korean documentation
├── docs-ja/          # Japanese documentation  
├── docs-zh/          # Chinese documentation
├── src/
│   ├── pages/        # Custom pages (main landing page)
│   ├── components/   # React components
│   ├── css/          # Custom styles
│   └── theme/        # Theme customizations
├── static/           # Static assets (images, icons, files)
├── scripts/          # Automation and conversion scripts
├── sidebars-*.ts     # Navigation structure for each language
└── docusaurus.config.ts  # Main configuration with multi-instance setup
```

### Key Configuration Files
- `docusaurus.config.ts` - Multi-instance configuration, defines 4 separate docs plugins
- `sidebars-[lang].ts` - Navigation structure for each language (tutorialSidebar)
- `src/pages/index.tsx` - Landing page with language selection cards
- `tsconfig.json` - Extends @docusaurus/tsconfig with baseUrl configuration

## Content Management Scripts

Located in `scripts/` directory for content conversion and maintenance:

```bash
# Convert Mintlify format to Docusaurus (for new content)
./scripts/mintlify-to-docusaurus-converter-v2.sh [directory]

# Convert Cline references to Careti
./scripts/cline-to-caret-renamer.sh [directory]           # Rename files
./scripts/cline-to-caret-content-replacer.sh [directory]  # Replace content

# Fix formatting issues
./scripts/fix-all-components.sh [directory]       # Fix component formatting
./scripts/fix-accordion-tags.sh [directory]       # Fix accordion components
./scripts/fix-broken-tags.sh [directory]          # Fix broken HTML tags

# Content updates
./scripts/update-from-cline-docs.sh [directory]   # Update from Cline documentation
```

## Multi-Language Architecture

**Docusaurus Configuration Pattern:**
The site uses multiple docs plugin instances (not Docusaurus i18n) defined in `docusaurus.config.ts`:

```typescript
plugins: [
  [
    '@docusaurus/plugin-content-docs',
    {
      id: 'docs-en',
      path: './docs-en',
      routeBasePath: 'en',
      sidebarPath: './sidebars-en.ts',
    },
  ],
  // ... similar configs for ko, ja, zh
]
```

**Content Organization:**
- Each language maintains identical file/folder structure
- File names should be consistent across languages (e.g., `what-is-caret.mdx` in all languages)
- Sidebar configurations must be manually synchronized when adding new content
- All languages share the same assets in `static/` folder

**Navigation Structure:**
- Main landing page (`/`) displays language selection cards
- Each language has independent navigation defined in its sidebar file
- Routes are language-prefixed: `/en/getting-started/what-is-caret`

## Key Development Considerations

### Content Synchronization
When adding new documentation pages:
1. Add the page to the appropriate language folder(s) 
2. Update corresponding `sidebars-[lang].ts` file(s) to include the new page
3. Ensure consistent file naming across all language versions
4. Test that navigation works correctly for all affected languages

### Attribution Requirements
- Preserve original Cline attribution in `what-is-caret.mdx` files across all languages
- Maintain consistent technical terminology and code examples across languages
- Keep command syntax and technical references unchanged during translation

### Build Optimization
- All languages build together in a single `npm run build` command
- Built files are output to `build/` directory with language-specific subdirectories
- The site can be deployed as static files to any hosting service

### Development Workflow
- Start development server to test all languages simultaneously
- Use `npm run clear` if experiencing cache-related issues
- Run `npm run typecheck` before committing to catch TypeScript errors
- Content scripts should be run from the repository root directory

## Deployment

The built site (`build/` directory) can be deployed to:
- Vercel (recommended for GitHub integration)
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

For GitHub Pages deployment:
```bash
USE_SSH=true npm run deploy  # Using SSH
GIT_USER=<username> npm run deploy  # Using HTTPS
```