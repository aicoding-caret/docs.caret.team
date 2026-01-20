import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// Brand configuration for multi-domain deployment
type BrandType = 'caret' | 'careti';
const BRANDS = {
  caret: { name: 'Careti', domain: 'docs.careti.ai', serviceDomain: 'caret.team' },
  careti: { name: 'Careti', domain: 'docs.careti.ai', serviceDomain: 'careti.ai' },
};
const brand: BrandType = (process.env.BRAND === 'caret' || process.env.BRAND === 'careti')
  ? process.env.BRAND
  : 'careti'; // Default: new standard
const brandConfig = BRANDS[brand];

const config: Config = {
  title: `${brandConfig.name} Documentation`,
  tagline: 'AI-powered coding assistant based on Cline',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: `https://${brandConfig.domain}`,
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'docs-en',
        path: './docs-en',
        routeBasePath: 'en',
        sidebarPath: './sidebars-en.ts',
        editUrl: 'https://github.com/aicoding-caret/docs.careti.ai/tree/main/docs-en/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'docs-ko',
        path: './docs-ko',
        routeBasePath: 'ko',
        sidebarPath: './sidebars-ko.ts',
        editUrl: 'https://github.com/aicoding-caret/docs.careti.ai/tree/main/docs-ko/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'docs-zh',
        path: './docs-zh',
        routeBasePath: 'zh',
        sidebarPath: './sidebars-zh.ts',
        editUrl: 'https://github.com/aicoding-caret/docs.careti.ai/tree/main/docs-zh/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'docs-ja',
        path: './docs-ja',
        routeBasePath: 'ja',
        sidebarPath: './sidebars-ja.ts',
        editUrl: 'https://github.com/aicoding-caret/docs.careti.ai/tree/main/docs-ja/',
      },
    ],
  ],
  presets: [
    [
      'classic',
      {
        docs: false, // Disable default docs
        blog: false, // Disable blog
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  
  themes: ['@docusaurus/theme-mermaid'],

  markdown: {
    mermaid: true,
  },

  // Custom fields accessible via useDocusaurusContext
  customFields: {
    brand: brand,
    brandName: brandConfig.name,
    brandDomain: brandConfig.domain,
    brandServiceDomain: brandConfig.serviceDomain,
  },

  themeConfig: {
    // Default social card (overridden per-locale in LayoutHead)
    image: 'og/ogtag-en.webp',
    navbar: {
      title: `${brandConfig.name} Docs`,
      logo: {
        alt: `${brandConfig.name} Logo`,
        src: 'img/logo.svg',
      },
      items: [
        {
          href: `https://${brandConfig.serviceDomain}`,
          label: 'Service',
          position: 'left',
          target: '_self',
        },
        {
          href: 'https://marketplace.visualstudio.com/items?itemName=caretive.caret',
          label: 'Download',
          position: 'right',
        },
        {
          type: 'dropdown',
          label: 'Language',
          position: 'right',
          items: [
            { label: 'English', href: '/en/getting-started/what-is-caret' },
            { label: '한국어', href: '/ko/getting-started/what-is-caret' },
            { label: '日本語', href: '/ja/getting-started/what-is-caret' },
            { label: '中文', href: '/zh/getting-started/what-is-caret' },
          ],
        },
        {
          href: 'https://github.com/aicoding-caret/caret',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Company',
          items: [
            {
              label: `Download ${brandConfig.name}`,
              href: 'https://marketplace.visualstudio.com/items?itemName=caretive.caret',
            },
            {
              label: `${brandConfig.name} GitHub`,
              href: 'https://github.com/aicoding-caret/caret',
            },
            {
              label: 'Service Introduction',
              href: `https://${brandConfig.serviceDomain}`,
            },
            {
              label: 'Caretive Inc',
              href: 'https://caretive.ai',
            },
          ],
        },
        {
          title: 'Support',
          items: [
            {
              label: 'Customer Service',
              href: 'mailto:support@caretive.ai',
            },
          ],
        },
      ],
      copyright: `ⓒ ${new Date().getFullYear()} Caretive INC | Business Registration: 459-81-03703`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
