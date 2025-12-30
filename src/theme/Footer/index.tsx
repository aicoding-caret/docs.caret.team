// CARET MODIFICATION: Custom footer aligned with caret.team content and locale routing.
import React, { useEffect, useState } from "react"
import Link from "@docusaurus/Link"
import { useLocation } from "@docusaurus/router"

type Locale = "en" | "ko" | "ja" | "zh"

const localePrefixes: Locale[] = ["en", "ko", "ja", "zh"]

const getLocaleFromPath = (pathname: string): Locale => {
	const trimmed = pathname.startsWith("/") ? pathname.slice(1) : pathname
	const prefix = trimmed.split("/")[0] as Locale
	return localePrefixes.includes(prefix) ? prefix : "en"
}

const hasExplicitLocale = (pathname: string): boolean =>
	localePrefixes.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`))

const buildFooterLinks = (locale: Locale) => {
	const caretTeam = `https://caret.team/${locale}`
	const docsHome = `/${locale}/getting-started/what-is-caret`
	const brochure = `${caretTeam}/brochure`
	const caretiveLocale = locale === "ko" ? "ko" : "en"
	const caretiveBase = `https://www.caretive.ai/${caretiveLocale}`
	const caretiveNews = `${caretiveBase}#news`
	const caretiveCareers = `${caretiveBase}/recruit`

	return {
		product: [
			{ label: "Download (VS Code)", href: "https://marketplace.visualstudio.com/items?itemName=caretive.caret" },
			{ label: "Download (Open VSX)", href: "https://open-vsx.org/extension/Caretive/caret" },
			{ label: "Caret Enterprise Brochure", href: brochure },
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
		copyright: "© 2025 Caretive INC / Caret. All rights reserved.",
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
		copyright: "ⓒ 2025 Caretive INC / Caret. All rights reserved.",
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
					{ label: "Caret エンタープライズ資料", href: footerLinks.ja.product[2].href },
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
		copyright: "© 2025 Caretive INC / Caret. All rights reserved.",
	},
	zh: {
		description: "",
		sections: [
			{
				title: "产品",
				items: [
					{ label: "下载 (VS Code)", href: footerLinks.zh.product[0].href },
					{ label: "下载 (Open VSX)", href: footerLinks.zh.product[1].href },
					{ label: "Caret 企业版资料", href: footerLinks.zh.product[2].href },
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
		copyright: "© 2025 Caretive INC / Caret. 保留所有权利。",
	},
}

const Footer = (): JSX.Element => {
	const { pathname } = useLocation()
	const [locale, setLocale] = useState<Locale>(() => getLocaleFromPath(pathname))

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
													target="_blank"
													rel="noreferrer">
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
					<div className="footer__copyright">{copy.copyright}</div>
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
