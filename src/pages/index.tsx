import Heading from "@theme/Heading"
import Layout from "@theme/Layout"
import type { ReactNode } from "react"
import { useEffect, useMemo, useState } from "react"

type Locale = "en" | "ko" | "ja" | "zh"

const localeList: Locale[] = ["en", "ko", "ja", "zh"]

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
}

const copy: Record<Locale, LangCopy> = {
	en: {
		siteTitle: "Caret Docs",
		siteDescription:
			"Caret is an AI coding partner named after the text cursor. Built on the powerful open-source Cline, we add free credits, dual mode, personas, region-specific models, and an improved system prompt/UX—while protecting individual workflows, supporting enterprise-grade customization, and evolving toward an AI-native coding platform that meets enterprise AI transformation (AX) standards.",
		heroTitle: "Caret, your AI coding partner",
		heroSubtitle: "",
		heroDescription:
			"Caret is an AI coding partner named after the text cursor. Built on the powerful open-source Cline, we add free credits, dual mode, personas, region-specific models, and an improved system prompt/UX—while protecting individual workflows, supporting enterprise-grade customization, and evolving toward an AI-native coding platform that meets enterprise AI transformation (AX) standards.",
		docsCta: "Go to English Docs",
	},
	ko: {
		siteTitle: "캐럿 문서",
		siteDescription:
			"Caret는 텍스트 커서(cursor)에서 이름을 가져온 AI 코딩 파트너입니다. 강력한 오픈소스 Cline 기반 위에 무료 크레딧, 듀얼 모드, 페르소나, 한국 특화 모델, 개선된 시스템 프롬프트/UX를 더했고, 개인 사용 경험을 지키면서도 기업 전용 커스터마이징을 지원하며 기업 AI전환(AX) 기준을 만족시키는 AI 네이티브 코딩 플랫폼을 목표로 발전하고 있습니다.",
		heroTitle: "캐럿 나만의 AI 코딩 파트너",
		heroSubtitle: "",
		heroDescription:
			"Caret는 텍스트 커서(cursor)에서 이름을 가져온 AI 코딩 파트너입니다. 강력한 오픈소스 Cline 기반 위에 무료 크레딧, 듀얼 모드, 페르소나, 한국 특화 모델, 개선된 시스템 프롬프트/UX를 더했고, 개인 사용 경험을 지키면서도 기업 전용 커스터마이징을 지원하며 기업 AI전환(AX) 기준을 만족시키는 AI 네이티브 코딩 플랫폼을 목표로 발전하고 있습니다.",
		docsCta: "한국어 문서 보기",
	},
	ja: {
		siteTitle: "Caret ドキュメント",
		siteDescription:
			"Caret はテキストカーソル（cursor）に由来する AI コーディングパートナーです。強力なオープンソース Cline を基盤に、無料クレジット、デュアルモード、ペルソナ、地域特化モデル、改善されたシステムプロンプト/UXを追加しました。個人の利用体験を守りつつ企業向けカスタマイズに対応し、企業の AI 変革（AX）基準を満たす AI ネイティブなコーディングプラットフォームを目指して進化しています。",
		heroTitle: "あなただけのAIコーディングパートナー、Caret",
		heroSubtitle: "",
		heroDescription:
			"Caret はテキストカーソル（cursor）に由来する AI コーディングパートナーです。強力なオープンソース Cline を基盤に、無料クレジット、デュアルモード、ペルソナ、地域特化モデル、改善されたシステムプロンプト/UXを追加しました。個人の利用体験を守りつつ企業向けカスタマイズに対応し、企業の AI 変革（AX）基準を満たす AI ネイティブなコーディングプラットフォームを目指して進化しています。",
		docsCta: "日本語ドキュメントを見る",
	},
	zh: {
		siteTitle: "Caret 文档",
		siteDescription:
			"Caret 是源自文本光标（cursor）命名的 AI 编码伙伴。基于强大的开源 Cline，我们加入了免费积分、双模式、人格化、区域特化模型，以及改进的系统提示词/UX。在不牺牲个人使用体验的前提下，支持企业级定制，并以满足企业 AI 转型（AX）标准的 AI 原生编码平台为目标持续进化。",
		heroTitle: "你的 AI 编码伙伴，Caret",
		heroSubtitle: "",
		heroDescription:
			"Caret 是源自文本光标（cursor）命名的 AI 编码伙伴。基于强大的开源 Cline，我们加入了免费积分、双模式、人格化、区域特化模型，以及改进的系统提示词/UX。在不牺牲个人使用体验的前提下，支持企业级定制，并以满足企业 AI 转型（AX）标准的 AI 原生编码平台为目标持续进化。",
		docsCta: "查看中文文档",
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
