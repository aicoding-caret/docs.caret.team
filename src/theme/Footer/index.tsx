// CARET MODIFICATION: Custom footer aligned with careti.ai content and locale routing.

import Link from "@docusaurus/Link"
import { useLocation } from "@docusaurus/router"
import React, { useEffect, useState } from "react"

type Locale = "en" | "ko" | "ja" | "zh" | "fr" | "de" | "ru"
type BrandType = "caret" | "careti"

// Domain to brand mapping
const BRAND_DOMAINS: Record<string, BrandType> = {
	"docs.careti.ai": "careti",
	"careti.ai": "careti",
	localhost: "careti",
}

// Brand names by locale
const BRAND_NAMES: Record<BrandType, Record<Locale, string>> = {
	caret: { en: "Caret", ko: "캐럿", ja: "Caret", zh: "Caret", fr: "Caret", de: "Caret", ru: "Caret" },
	careti: { en: "Careti", ko: "캐러티", ja: "Careti", zh: "Careti", fr: "Careti", de: "Careti", ru: "Careti" },
}

const detectBrand = (): BrandType => {
	if (typeof window === "undefined") return "careti"
	const hostname = window.location.hostname
	if (BRAND_DOMAINS[hostname]) return BRAND_DOMAINS[hostname]
	for (const [domain, brand] of Object.entries(BRAND_DOMAINS)) {
		if (hostname.includes(domain)) return brand
	}
	return "careti"
}

const localePrefixes: Locale[] = ["en", "ko", "ja", "zh", "fr", "de", "ru"]

const getLocaleFromPath = (pathname: string): Locale => {
	const trimmed = pathname.startsWith("/") ? pathname.slice(1) : pathname
	const prefix = trimmed.split("/")[0] as Locale
	return localePrefixes.includes(prefix) ? prefix : "en"
}

const hasExplicitLocale = (pathname: string): boolean =>
	localePrefixes.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`))

const buildFooterLinks = (locale: Locale) => {
	const caretTeam = `https://careti.ai/${locale}`
	const docsHome = `/${locale}/getting-started/what-is-careti`
	const brochure = `${caretTeam}/brochure`
	const caretiveLocale = locale === "ko" ? "ko" : "en"
	const caretiveBase = `https://www.caretive.ai/${caretiveLocale}`
	const caretiveNews = `${caretiveBase}#news`
	const caretiveCareers = `${caretiveBase}/recruit`

	return {
		product: [
			{ label: "Download (VS Code)", href: "https://marketplace.visualstudio.com/items?itemName=caretive.caret" },
			{ label: "Download (Open VSX)", href: "https://open-vsx.org/extension/Caretive/caret" },
			{ label: "Careti Enterprise Brochure", href: brochure },
			{ label: "Features", href: `${caretTeam}/#features` },
			{ label: "Pricing", href: `${caretTeam}/#pricing` },
			{ label: "Docs", href: docsHome },
			{ label: "Changelog", href: `${caretTeam}/changelog` },
			{ label: "Contact", href: `${caretTeam}/sales` },
		],
		community: [
			{ label: "Blog", href: `${caretTeam}/blog` },
			{ label: "YouTube", href: "https://www.youtube.com/@aicoding-caret" },
			{ label: "Discord", href: "https://discord.gg/K3mU3EEvWm" },
			{ label: "GitHub", href: "https://github.com/aicoding-caret/caret" },
		],
		company: [
			{ label: "About", href: "https://caretive.ai" },
			{ label: "News", href: caretiveNews },
			{ label: "Careers", href: caretiveCareers },
			{ label: "Contact", href: `${caretTeam}/sales` },
		],
		legal: [
			{ label: "Terms of Service", href: `${caretTeam}/terms` },
			{ label: "Privacy Policy", href: `${caretTeam}/privacy` },
		],
	}
}

const footerLinks = {
	en: buildFooterLinks("en"),
	ko: buildFooterLinks("ko"),
	ja: buildFooterLinks("ja"),
	zh: buildFooterLinks("zh"),
	fr: buildFooterLinks("fr"),
	de: buildFooterLinks("de"),
	ru: buildFooterLinks("ru"),
}

const localizedCopy: Record<
	Locale,
	{
		description: string
		sections: { title: string; items: { label: string; href: string }[] }[]
		copyright: string
		addressLines?: string[]
	}
> = {
	en: {
		description: "",
		sections: [
			{ title: "Product", items: footerLinks.en.product },
			{ title: "Community", items: footerLinks.en.community },
			{ title: "Company", items: footerLinks.en.company },
			{ title: "Legal", items: footerLinks.en.legal },
		],
		copyright: "© 2025 Caretive INC / Careti. All rights reserved.",
	},
	ko: {
		description: "",
		sections: [
			{
				title: "제품",
				items: [
					{ label: "다운로드 (VS Code)", href: footerLinks.ko.product[0].href },
					{ label: "다운로드 (Open VSX)", href: footerLinks.ko.product[1].href },
					{ label: "제품 브로셔", href: footerLinks.ko.product[2].href },
					{ label: "기능", href: footerLinks.ko.product[3].href },
					{ label: "가격", href: footerLinks.ko.product[4].href },
					{ label: "문서", href: footerLinks.ko.product[5].href },
					{ label: "변경 로그", href: footerLinks.ko.product[6].href },
					{ label: "문의", href: footerLinks.ko.product[7].href },
				],
			},
			{
				title: "커뮤니티",
				items: [
					{ label: "블로그", href: footerLinks.ko.community[0].href },
					{ label: "YouTube", href: footerLinks.ko.community[1].href },
					{ label: "Discord", href: footerLinks.ko.community[2].href },
					{ label: "GitHub", href: footerLinks.ko.community[3].href },
				],
			},
			{
				title: "회사",
				items: [
					{ label: "소개", href: footerLinks.ko.company[0].href },
					{ label: "뉴스", href: footerLinks.ko.company[1].href },
					{ label: "채용", href: footerLinks.ko.company[2].href },
					{ label: "문의", href: footerLinks.ko.company[3].href },
				],
			},
			{
				title: "법률",
				items: [
					{ label: "이용약관", href: footerLinks.ko.legal[0].href },
					{ label: "개인정보처리방침", href: footerLinks.ko.legal[1].href },
				],
			},
		],
		copyright: "ⓒ 2025 Caretive INC / Careti. All rights reserved.",
		addressLines: [
			"(주)캐럿티브 | 대표: 김기환 | 사업자등록번호: 459-81-03703 | 통신판매업 신고번호: 2025-화성동탄-3022호",
			"주소: 경기도 성남시 금토로 52 경기 스타트업 브릿지 811호 | 대표번호: 070-8064-2510 | 문의/제휴: support@caretive.ai",
		],
	},
	ja: {
		description: "",
		sections: [
			{
				title: "製品",
				items: [
					{ label: "ダウンロード (VS Code)", href: footerLinks.ja.product[0].href },
					{ label: "ダウンロード (Open VSX)", href: footerLinks.ja.product[1].href },
					{ label: "Careti エンタープライズ資料", href: footerLinks.ja.product[2].href },
					{ label: "機能", href: footerLinks.ja.product[3].href },
					{ label: "価格", href: footerLinks.ja.product[4].href },
					{ label: "ドキュメント", href: footerLinks.ja.product[5].href },
					{ label: "変更履歴", href: footerLinks.ja.product[6].href },
					{ label: "お問い合わせ", href: footerLinks.ja.product[7].href },
				],
			},
			{
				title: "コミュニティ",
				items: [
					{ label: "ブログ", href: footerLinks.ja.community[0].href },
					{ label: "YouTube", href: footerLinks.ja.community[1].href },
					{ label: "Discord", href: footerLinks.ja.community[2].href },
					{ label: "GitHub", href: footerLinks.ja.community[3].href },
				],
			},
			{
				title: "会社",
				items: [
					{ label: "会社概要", href: footerLinks.ja.company[0].href },
					{ label: "ニュース", href: footerLinks.ja.company[1].href },
					{ label: "採用", href: footerLinks.ja.company[2].href },
					{ label: "お問い合わせ", href: footerLinks.ja.company[3].href },
				],
			},
			{
				title: "法務",
				items: [
					{ label: "利用規約", href: footerLinks.ja.legal[0].href },
					{ label: "プライバシーポリシー", href: footerLinks.ja.legal[1].href },
				],
			},
		],
		copyright: "© 2025 Caretive INC / Careti. All rights reserved.",
	},
	zh: {
		description: "",
		sections: [
			{
				title: "产品",
				items: [
					{ label: "下载 (VS Code)", href: footerLinks.zh.product[0].href },
					{ label: "下载 (Open VSX)", href: footerLinks.zh.product[1].href },
					{ label: "Careti 企业版资料", href: footerLinks.zh.product[2].href },
					{ label: "功能", href: footerLinks.zh.product[3].href },
					{ label: "价格", href: footerLinks.zh.product[4].href },
					{ label: "文档", href: footerLinks.zh.product[5].href },
					{ label: "更新日志", href: footerLinks.zh.product[6].href },
					{ label: "联系", href: footerLinks.zh.product[7].href },
				],
			},
			{
				title: "社区",
				items: [
					{ label: "博客", href: footerLinks.zh.community[0].href },
					{ label: "YouTube", href: footerLinks.zh.community[1].href },
					{ label: "Discord", href: footerLinks.zh.community[2].href },
					{ label: "GitHub", href: footerLinks.zh.community[3].href },
				],
			},
			{
				title: "公司",
				items: [
					{ label: "关于", href: footerLinks.zh.company[0].href },
					{ label: "新闻", href: footerLinks.zh.company[1].href },
					{ label: "招聘", href: footerLinks.zh.company[2].href },
					{ label: "联系我们", href: footerLinks.zh.company[3].href },
				],
			},
			{
				title: "法律",
				items: [
					{ label: "服务条款", href: footerLinks.zh.legal[0].href },
					{ label: "隐私政策", href: footerLinks.zh.legal[1].href },
				],
			},
		],
		copyright: "© 2025 Caretive INC / Careti. 保留所有权利。",
	},
	fr: {
		description: "",
		sections: [
			{
				title: "Produit",
				items: [
					{ label: "Télécharger (VS Code)", href: footerLinks.fr.product[0].href },
					{ label: "Télécharger (Open VSX)", href: footerLinks.fr.product[1].href },
					{ label: "Brochure Careti Enterprise", href: footerLinks.fr.product[2].href },
					{ label: "Fonctionnalités", href: footerLinks.fr.product[3].href },
					{ label: "Tarifs", href: footerLinks.fr.product[4].href },
					{ label: "Documentation", href: footerLinks.fr.product[5].href },
					{ label: "Notes de version", href: footerLinks.fr.product[6].href },
					{ label: "Contact", href: footerLinks.fr.product[7].href },
				],
			},
			{
				title: "Communauté",
				items: [
					{ label: "Blog", href: footerLinks.fr.community[0].href },
					{ label: "YouTube", href: footerLinks.fr.community[1].href },
					{ label: "Discord", href: footerLinks.fr.community[2].href },
					{ label: "GitHub", href: footerLinks.fr.community[3].href },
				],
			},
			{
				title: "Entreprise",
				items: [
					{ label: "À propos", href: footerLinks.fr.company[0].href },
					{ label: "Actualités", href: footerLinks.fr.company[1].href },
					{ label: "Carrières", href: footerLinks.fr.company[2].href },
					{ label: "Contact", href: footerLinks.fr.company[3].href },
				],
			},
			{
				title: "Mentions légales",
				items: [
					{ label: "Conditions d'utilisation", href: footerLinks.fr.legal[0].href },
					{ label: "Politique de confidentialité", href: footerLinks.fr.legal[1].href },
				],
			},
		],
		copyright: "© 2025 Caretive INC / Careti. Tous droits réservés.",
	},
	de: {
		description: "",
		sections: [
			{
				title: "Produkt",
				items: [
					{ label: "Download (VS Code)", href: footerLinks.de.product[0].href },
					{ label: "Download (Open VSX)", href: footerLinks.de.product[1].href },
					{ label: "Careti Enterprise-Broschüre", href: footerLinks.de.product[2].href },
					{ label: "Funktionen", href: footerLinks.de.product[3].href },
					{ label: "Preise", href: footerLinks.de.product[4].href },
					{ label: "Dokumentation", href: footerLinks.de.product[5].href },
					{ label: "Änderungsprotokoll", href: footerLinks.de.product[6].href },
					{ label: "Kontakt", href: footerLinks.de.product[7].href },
				],
			},
			{
				title: "Gemeinschaft",
				items: [
					{ label: "Blog", href: footerLinks.de.community[0].href },
					{ label: "YouTube", href: footerLinks.de.community[1].href },
					{ label: "Discord", href: footerLinks.de.community[2].href },
					{ label: "GitHub", href: footerLinks.de.community[3].href },
				],
			},
			{
				title: "Unternehmen",
				items: [
					{ label: "Über uns", href: footerLinks.de.company[0].href },
					{ label: "Nachrichten", href: footerLinks.de.company[1].href },
					{ label: "Karrieren", href: footerLinks.de.company[2].href },
					{ label: "Kontakt", href: footerLinks.de.company[3].href },
				],
			},
			{
				title: "Rechtliches",
				items: [
					{ label: "Nutzungsbedingungen", href: footerLinks.de.legal[0].href },
					{ label: "Datenschutzerklärung", href: footerLinks.de.legal[1].href },
				],
			},
		],
		copyright: "© 2025 Caretive INC / Careti. Alle Rechte vorbehalten.",
	},
	ru: {
		description: "",
		sections: [
			{
				title: "Продукт",
				items: [
					{ label: "Скачать (VS Code)", href: footerLinks.ru.product[0].href },
					{ label: "Скачать (Open VSX)", href: footerLinks.ru.product[1].href },
					{ label: "Брошюра Careti Enterprise", href: footerLinks.ru.product[2].href },
					{ label: "Функции", href: footerLinks.ru.product[3].href },
					{ label: "Цены", href: footerLinks.ru.product[4].href },
					{ label: "Документация", href: footerLinks.ru.product[5].href },
					{ label: "История изменений", href: footerLinks.ru.product[6].href },
					{ label: "Контакт", href: footerLinks.ru.product[7].href },
				],
			},
			{
				title: "Сообщество",
				items: [
					{ label: "Блог", href: footerLinks.ru.community[0].href },
					{ label: "YouTube", href: footerLinks.ru.community[1].href },
					{ label: "Discord", href: footerLinks.ru.community[2].href },
					{ label: "GitHub", href: footerLinks.ru.community[3].href },
				],
			},
			{
				title: "Компания",
				items: [
					{ label: "О нас", href: footerLinks.ru.company[0].href },
					{ label: "Новости", href: footerLinks.ru.company[1].href },
					{ label: "Карьера", href: footerLinks.ru.company[2].href },
					{ label: "Контакт", href: footerLinks.ru.company[3].href },
				],
			},
			{
				title: "Юридические документы",
				items: [
					{ label: "Условия обслуживания", href: footerLinks.ru.legal[0].href },
					{ label: "Политика конфиденциальности", href: footerLinks.ru.legal[1].href },
				],
			},
		],
		copyright: "© 2025 Caretive INC / Careti. Все права защищены.",
	},
}

const Footer = (): JSX.Element => {
	const { pathname } = useLocation()
	const [locale, setLocale] = useState<Locale>(() => getLocaleFromPath(pathname))
	const [brand, setBrand] = useState<BrandType>("careti")

	useEffect(() => {
		setBrand(detectBrand())
	}, [])

	useEffect(() => {
		const pathLocale = getLocaleFromPath(pathname)
		if (hasExplicitLocale(pathname)) {
			setLocale(pathLocale)
			return
		}
		if (typeof window === "undefined") {
			setLocale(pathLocale)
			return
		}
		const stored = window.localStorage.getItem("caretPreferredLang") as Locale | null
		if (stored && localePrefixes.includes(stored)) {
			setLocale(stored)
			return
		}
		setLocale(pathLocale)
	}, [pathname])

	useEffect(() => {
		if (typeof window === "undefined") return

		const onStorage = (event: StorageEvent) => {
			if (event.key !== "caretPreferredLang" || typeof event.newValue !== "string") return
			const next = event.newValue as Locale
			if (localePrefixes.includes(next)) setLocale(next)
		}

		const onLangChange = (event: Event) => {
			const detail = (event as CustomEvent<{ locale?: Locale }>).detail
			const next = detail?.locale
			if (next && localePrefixes.includes(next)) setLocale(next)
		}

		window.addEventListener("storage", onStorage)
		window.addEventListener("caret:lang-change", onLangChange)
		return () => {
			window.removeEventListener("storage", onStorage)
			window.removeEventListener("caret:lang-change", onLangChange)
		}
	}, [])

	const copy = localizedCopy[locale]
	const brandName = BRAND_NAMES[brand][locale]
	const dynamicCopyright = copy.copyright.replace(/Careti|Caret/g, brandName)

	return (
		<footer className="footer footer--dark">
			<div className="container container--fluid">
				{copy.description ? <div className="footer__description">{copy.description}</div> : null}
				<div className="row footer__links">
					{copy.sections.map((section) => (
						<div className="col col--3" key={section.title}>
							<div className="footer__title">{section.title}</div>
							<ul className="footer__items">
								{section.items.map((item) => {
									const isExternal = item.href.startsWith("http")
									return (
										<li className="footer__item" key={`${section.title}-${item.label}`}>
											{isExternal ? (
												<a
													className="footer__link-item"
													href={item.href}
													rel="noreferrer"
													target="_blank">
													{item.label}
												</a>
											) : (
												<Link className="footer__link-item" to={item.href}>
													{item.label}
												</Link>
											)}
										</li>
									)
								})}
							</ul>
						</div>
					))}
				</div>
				<div className="footer__bottom text--center">
					<div className="footer__copyright">{dynamicCopyright}</div>
					{copy.addressLines ? (
						<address className="footer__address">
							{copy.addressLines.map((line) => (
								<div key={line}>{line}</div>
							))}
						</address>
					) : null}
				</div>
			</div>
		</footer>
	)
}

export default Footer
