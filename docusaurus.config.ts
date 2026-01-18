import type * as Preset from "@docusaurus/preset-classic"
import type { Config } from "@docusaurus/types"
import { themes as prismThemes } from "prism-react-renderer"

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const siteUrl = "https://docs.caret.team"
const localePrefixes = ["en", "ko", "ja", "zh", "fr", "de", "ru"] as const
type LocalePrefix = (typeof localePrefixes)[number]
const defaultLocale: LocalePrefix = "en"
const hreflangByLocale: Record<LocalePrefix, string> = {
	en: "en-US",
	ko: "ko-KR",
	ja: "ja-JP",
	zh: "zh-CN",
	fr: "fr-FR",
	de: "de-DE",
	ru: "ru-RU",
}

const buildAlternateLinks = (pathname: string) => {
	const trimmed = pathname.replace(/^\/+/, "")
	const parts = trimmed.split("/")
	const locale = parts[0] as LocalePrefix
	if (!localePrefixes.includes(locale)) {
		return []
	}

	const rest = parts.slice(1).join("/")
	const suffix = rest ? `/${rest}` : ""
	const base = siteUrl.replace(/\/$/, "")

	const links = localePrefixes.map((value) => ({
		lang: hreflangByLocale[value],
		url: `${base}/${value}${suffix}`,
	}))

	links.push({ lang: "x-default", url: `${base}/${defaultLocale}${suffix}` })
	return links
}

const config: Config = {
	title: "Caret Docs",
	tagline: "Caret, your AI coding partner",
	favicon: "favicon.png",

	// Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
	future: {
		v4: true, // Improve compatibility with the upcoming Docusaurus v4
	},

	// Set the production url of your site here
	url: siteUrl,
	// Set the /<baseUrl>/ pathname under which your site is served
	// For GitHub pages deployment, it is often '/<projectName>/'
	baseUrl: "/",

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	organizationName: "aicoding-caret", // Usually your GitHub org/user name.
	projectName: "docs.caret.team", // Usually your repo name.

	onBrokenLinks: "warn",
	onBrokenMarkdownLinks: "warn",

	// Even if you don't use internationalization, you can use this field to set
	// useful metadata like html lang. For example, if your site is Chinese, you
	// may want to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: "en",
		locales: ["en"],
	},

	plugins: [
		[
			"@docusaurus/plugin-content-docs",
			{
				id: "docs-en",
				path: "./docs-en",
				routeBasePath: "en",
				sidebarPath: "./sidebars-en.ts",
				editUrl: "https://github.com/aicoding-caret/docs.caret.team/tree/main/docs-en/",
			},
		],
		[
			"@docusaurus/plugin-content-docs",
			{
				id: "docs-ko",
				path: "./docs-ko",
				routeBasePath: "ko",
				sidebarPath: "./sidebars-ko.ts",
				editUrl: "https://github.com/aicoding-caret/docs.caret.team/tree/main/docs-ko/",
			},
		],
		[
			"@docusaurus/plugin-content-docs",
			{
				id: "docs-zh",
				path: "./docs-zh",
				routeBasePath: "zh",
				sidebarPath: "./sidebars-zh.ts",
				editUrl: "https://github.com/aicoding-caret/docs.caret.team/tree/main/docs-zh/",
			},
		],
		[
			"@docusaurus/plugin-content-docs",
			{
				id: "docs-ja",
				path: "./docs-ja",
				routeBasePath: "ja",
				sidebarPath: "./sidebars-ja.ts",
				editUrl: "https://github.com/aicoding-caret/docs.caret.team/tree/main/docs-ja/",
			},
		],
		[
			"@docusaurus/plugin-content-docs",
			{
				id: "docs-fr",
				path: "./docs-fr",
				routeBasePath: "fr",
				sidebarPath: "./sidebars-fr.ts",
				editUrl: "https://github.com/aicoding-caret/docs.caret.team/tree/main/docs-fr/",
			},
		],
		[
			"@docusaurus/plugin-content-docs",
			{
				id: "docs-de",
				path: "./docs-de",
				routeBasePath: "de",
				sidebarPath: "./sidebars-de.ts",
				editUrl: "https://github.com/aicoding-caret/docs.caret.team/tree/main/docs-de/",
			},
		],
		[
			"@docusaurus/plugin-content-docs",
			{
				id: "docs-ru",
				path: "./docs-ru",
				routeBasePath: "ru",
				sidebarPath: "./sidebars-ru.ts",
				editUrl: "https://github.com/aicoding-caret/docs.caret.team/tree/main/docs-ru/",
			},
		],
	],
	presets: [
		[
			"classic",
			{
				docs: false, // Disable default docs
				blog: false, // Disable blog
				sitemap: {
					changefreq: "weekly",
					priority: 0.5,
					createSitemapItems: async (params) => {
						const items = await params.defaultCreateSitemapItems(params)
						const base = siteUrl.replace(/\/$/, "")
						return items.map((item) => {
							if (!item.url) {
								return item
							}
							const path = item.url.startsWith(base) ? item.url.slice(base.length) : item.url
							const links = buildAlternateLinks(path)
							return links.length ? { ...item, links } : item
						})
					},
				},
				theme: {
					customCss: "./src/css/custom.css",
				},
			} satisfies Preset.Options,
		],
	],

	themes: ["@docusaurus/theme-mermaid"],

	markdown: {
		mermaid: true,
	},

	themeConfig: {
		// Default social card (overridden per-locale in LayoutHead)
		image: "og/ogtag-en.webp",
		navbar: {
			title: "Caret Docs",
			logo: {
				alt: "Caret Logo",
				src: "img/logo.svg",
			},
			items: [
				{
					type: "custom-localeService",
					label: "Service",
					labels: {
						en: "Service",
						ko: "서비스",
						ja: "サービス",
						zh: "服务",
					fr: "Service",
					de: "Service",
					ru: "Сервис",
					},
					position: "left",
					target: "_self",
				},
				{
					type: "custom-downloadDropdown",
					label: "Download",
					labels: {
						en: "Download",
						ko: "다운로드",
						ja: "ダウンロード",
						zh: "下载",
					fr: "Télécharger",
					de: "Download",
					ru: "Скачать",
					},
					position: "right",
				},
				{
					type: "custom-localeLanguageDropdown",
					label: "Language",
					labels: {
						en: "Language",
						ko: "언어",
						ja: "言語",
						zh: "语言",
					fr: "Langue",
					de: "Sprache",
					ru: "Язык",
					},
					position: "right",
				},
				{
					href: "https://github.com/aicoding-caret/caret",
					label: "GitHub",
					position: "right",
				},
				{
					href: "https://https://discord.gg/WB6yaR89YN",
					label: "Discord",
					position: "right",
				},
			],
		},
		metadata: [
			{
				name: "keywords",
				content:
					"캐럿, 캐럿 AI 코딩 파트너, Caret, Cline, AI Vibe Coding Partner, AI 바이브 코딩 파트너, AX, AI Transformation, AI Native SW Development, AI 네이티브 SW 개발, AI coding agent, LLM, developer tools, code assistant, software development",
			},
		],
		prism: {
			theme: prismThemes.github,
			darkTheme: prismThemes.dracula,
		},
	} satisfies Preset.ThemeConfig,
}

export default config
