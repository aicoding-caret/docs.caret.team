import Heading from "@theme/Heading"
import Layout from "@theme/Layout"
import type { ReactNode } from "react"
import { useEffect, useMemo, useState } from "react"

type Locale = "en" | "ko" | "ja" | "zh" | "fr" | "de" | "ru"

const localeList: Locale[] = ["en", "ko", "ja", "zh", "fr", "de", "ru"]

type LangCopy = {
	siteTitle: string
	siteDescription: string
	heroTitle: string
	heroSubtitle: string
	heroDescription: string
	docsCta: string
}

const docsHrefByLocale: Record<Locale, string> = {
	en: "/en/getting-started/what-is-caret",
	ko: "/ko/getting-started/what-is-caret",
	ja: "/ja/getting-started/what-is-caret",
	zh: "/zh/getting-started/what-is-caret",
	fr: "/fr/getting-started/what-is-caret",
	de: "/de/getting-started/what-is-caret",
	ru: "/ru/getting-started/what-is-caret",
}

const copy: Record<Locale, LangCopy> = {
	en: {
		siteTitle: "Caret Docs",
		siteDescription:
			"Caret is your AI coding partner that truly understands your project. Built on Cline's powerful foundation, enhanced with personas, dual modes, and intelligent context management.",
		heroTitle: "Code with AI that understands you",
		heroSubtitle: "Your AI coding partner, built for real-world development",
		heroDescription:
			"Caret transforms how you code. Personas adapt AI behavior to your style. Dual modes balance speed and precision. Smart context keeps AI aligned with your project rules. All built on the trusted Cline foundation—enhanced for developers who demand more.",
		docsCta: "Get Started",
	},
	ko: {
		siteTitle: "캐럿 문서",
		siteDescription:
			"Caret는 프로젝트를 진정으로 이해하는 AI 코딩 파트너입니다. Cline의 강력한 기반 위에 페르소나, 듀얼 모드, 지능형 컨텍스트 관리를 더했습니다.",
		heroTitle: "당신을 이해하는 AI와 함께 코딩하세요",
		heroSubtitle: "실제 개발을 위해 설계된 AI 코딩 파트너",
		heroDescription:
			"Caret는 코딩 방식을 혁신합니다. 페르소나가 AI를 당신의 스타일에 맞춥니다. 듀얼 모드가 속도와 정밀함의 균형을 잡습니다. 스마트 컨텍스트가 AI를 프로젝트 규칙에 맞게 유지합니다. 신뢰받는 Cline 기반 위에, 더 많은 것을 원하는 개발자를 위해 강화되었습니다.",
		docsCta: "시작하기",
	},
	ja: {
		siteTitle: "Caret ドキュメント",
		siteDescription:
			"Caret はプロジェクトを真に理解する AI コーディングパートナーです。Cline の強力な基盤の上に、ペルソナ、デュアルモード、インテリジェントなコンテキスト管理を追加しました。",
		heroTitle: "あなたを理解する AI とコーディング",
		heroSubtitle: "実際の開発のために設計された AI コーディングパートナー",
		heroDescription:
			"Caret はコーディングのあり方を変革します。ペルソナが AI をあなたのスタイルに適応させます。デュアルモードがスピードと精度のバランスを取ります。スマートコンテキストが AI をプロジェクトルールに沿って維持します。信頼できる Cline 基盤の上に、より多くを求める開発者のために強化されました。",
		docsCta: "はじめる",
	},
	zh: {
		siteTitle: "Caret 文档",
		siteDescription:
			"Caret 是真正理解您项目的 AI 编码伙伴。在 Cline 强大的基础上，增加了人格化、双模式和智能上下文管理。",
		heroTitle: "与理解你的 AI 一起编码",
		heroSubtitle: "为真实开发而设计的 AI 编码伙伴",
		heroDescription:
			"Caret 革新您的编码方式。人格化让 AI 适应您的风格。双模式平衡速度与精准。智能上下文让 AI 与项目规则保持一致。基于可信赖的 Cline 基础，为追求更多的开发者而强化。",
		docsCta: "开始使用",
	},
	fr: {
		siteTitle: "Documentation Caret",
		siteDescription:
			"Caret est votre partenaire de codage IA qui comprend vraiment votre projet. Construit sur la puissante base de Cline, enrichi de personas, modes duels et gestion intelligente du contexte.",
		heroTitle: "Codez avec une IA qui vous comprend",
		heroSubtitle: "Votre partenaire de codage IA, conçu pour le développement réel",
		heroDescription:
			"Caret transforme votre façon de coder. Les personas adaptent le comportement de l'IA à votre style. Les modes duels équilibrent vitesse et précision. Le contexte intelligent maintient l'IA alignée sur les règles de votre projet. Le tout construit sur la base fiable de Cline—amélioré pour les développeurs exigeants.",
		docsCta: "Commencer",
	},
	de: {
		siteTitle: "Caret Dokumentation",
		siteDescription:
			"Caret ist Ihr KI-Coding-Partner, der Ihr Projekt wirklich versteht. Aufgebaut auf Clines leistungsstarker Basis, erweitert um Personas, Dual-Modi und intelligentes Kontextmanagement.",
		heroTitle: "Programmieren Sie mit KI, die Sie versteht",
		heroSubtitle: "Ihr KI-Coding-Partner, entwickelt für echte Entwicklung",
		heroDescription:
			"Caret verändert Ihre Art zu programmieren. Personas passen das KI-Verhalten an Ihren Stil an. Dual-Modi balancieren Geschwindigkeit und Präzision. Intelligenter Kontext hält die KI an Ihren Projektregeln ausgerichtet. Alles aufgebaut auf der vertrauenswürdigen Cline-Basis—verbessert für anspruchsvolle Entwickler.",
		docsCta: "Loslegen",
	},
	ru: {
		siteTitle: "Документация Caret",
		siteDescription:
			"Caret — ваш ИИ-партнёр по программированию, который действительно понимает ваш проект. Построен на мощной основе Cline, дополнен персонами, двойными режимами и интеллектуальным управлением контекстом.",
		heroTitle: "Программируйте с ИИ, который вас понимает",
		heroSubtitle: "Ваш ИИ-партнёр по программированию для реальной разработки",
		heroDescription:
			"Caret преображает ваш подход к программированию. Персоны адаптируют поведение ИИ под ваш стиль. Двойные режимы балансируют скорость и точность. Умный контекст держит ИИ в соответствии с правилами проекта. Всё построено на надёжной основе Cline — улучшено для требовательных разработчиков.",
		docsCta: "Начать",
	},
}

const detectLocale = (): Locale => {
	if (typeof window === "undefined") return "en"
	const stored = window.localStorage.getItem("caretPreferredLang")
	if (stored && localeList.includes(stored as Locale)) return stored as Locale
	const nav = navigator.language?.toLowerCase().split("-")[0]
	if (nav && localeList.includes(nav as Locale)) return nav as Locale
	return "en"
}

export default function Home(): ReactNode {
	const [lang, setLang] = useState<Locale>("en")

	useEffect(() => {
		if (typeof window === "undefined") return
		const detected = detectLocale()
		setLang(detected)
	}, [])

	const strings = useMemo(() => copy[lang] ?? copy.en, [lang])
	const docsHref = docsHrefByLocale[lang]

	const handleLangSelect = (next: Locale, href?: string) => {
		if (typeof window === "undefined") return
		window.localStorage.setItem("caretPreferredLang", next)
		window.dispatchEvent(new CustomEvent("caret:lang-change", { detail: { locale: next } }))
		setLang(next)
		if (href) window.location.href = href
	}

	return (
		<Layout description={strings.siteDescription} title={strings.siteTitle}>
			<main>
				<div className="container margin-vert--lg home-hero">
					<div className="row">
						<div className="col col--8 col--offset-2">
							<div className="text--center margin-vert--lg">
								<Heading as="h1" className="hero__title">
									{strings.heroTitle}
								</Heading>
								{strings.heroSubtitle ? <p className="hero__subtitle">{strings.heroSubtitle}</p> : null}
								{strings.heroDescription ? <p className="hero__description">{strings.heroDescription}</p> : null}
								<div className="hero__actions">
									<div className="lang-switch">
										{[
											{ locale: "en", label: "English" },
											{ locale: "ko", label: "한국어" },
											{ locale: "ja", label: "日本語" },
											{ locale: "zh", label: "中文" },
											{ locale: "fr", label: "Français" },
											{ locale: "de", label: "Deutsch" },
											{ locale: "ru", label: "Русский" },
										].map((opt) => (
											<button
												className={`button button--sm ${lang === opt.locale ? "button--primary" : "button--secondary"}`}
												key={opt.locale}
												onClick={() => handleLangSelect(opt.locale as Locale)}>
												{opt.label}
											</button>
										))}
									</div>
									<div className="lang-cta">
										<button
											className="button button--primary button--lg lang-cta-button"
											onClick={() => handleLangSelect(lang, docsHref)}>
											{strings.docsCta}
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</Layout>
	)
}
