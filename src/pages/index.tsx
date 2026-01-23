import type {ReactNode} from 'react';
import {useEffect, useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

type Locale = 'en' | 'ko' | 'ja' | 'zh';
type BrandType = 'caret' | 'careti';

// Domain to brand mapping for runtime detection
const BRAND_DOMAINS: Record<string, BrandType> = {
  'docs.careti.ai': 'careti',
  'careti.ai': 'careti',
  'localhost': 'careti', // Development default
};

// Brand-specific content mapping
const brandNames: Record<BrandType, {en: string; ko: string; ja: string; zh: string}> = {
  caret: {en: 'Caret', ko: '캐럿', ja: 'Caret', zh: 'Caret'},
  careti: {en: 'Careti', ko: '캐러티', ja: 'Careti', zh: 'Careti'},
};

// Detect brand from hostname (client-side)
const detectBrandFromHost = (defaultBrand: BrandType): BrandType => {
  if (typeof window === 'undefined') return defaultBrand;
  const hostname = window.location.hostname;
  // Check exact match first
  if (BRAND_DOMAINS[hostname]) {
    return BRAND_DOMAINS[hostname];
  }
  // Check if hostname contains the domain
  for (const [domain, brand] of Object.entries(BRAND_DOMAINS)) {
    if (hostname.includes(domain)) {
      return brand;
    }
  }
  return defaultBrand;
};

const localeList: Locale[] = ['en', 'ko', 'ja', 'zh'];

type LangCopy = {
  heroTitle: string;
  heroSubtitle: string;
  chooseLanguage: string;
  cards: {flag: string; title: string; desc: string; button: string; href: string; locale: Locale}[];
  aboutTitle: string;
  aboutLines: string[];
};

// Generate copy with brand name substitution
const getCopy = (brandName: string, brandNameKo: string): Record<Locale, LangCopy> => ({
  en: {
    heroTitle: `Welcome to ${brandName} Documentation`,
    heroSubtitle: 'AI-powered coding assistant based on Cline',
    chooseLanguage: 'Choose Your Language',
    cards: [
      {flag: '🇺🇸', title: 'English', desc: 'Your personalized AI coding partner', button: 'Go to English Docs', href: '/en/getting-started/what-is-careti', locale: 'en'},
      {flag: '🇰🇷', title: '한국어', desc: '나만의 개인화된 AI 코딩 파트너', button: '한국어 문서 보기', href: '/ko/getting-started/what-is-careti', locale: 'ko'},
      {flag: '🇨🇳', title: '中文', desc: '您的个性化 AI 编程伙伴', button: '查看中文文档', href: '/zh/getting-started/what-is-careti', locale: 'zh'},
      {flag: '🇯🇵', title: '日本語', desc: 'あなた専用のパーソナライズド AI コーディングパートナー', button: '日本語ドキュメントを見る', href: '/ja/getting-started/what-is-careti', locale: 'ja'},
    ],
    aboutTitle: `About ${brandName}`,
    aboutLines: [
      `${brandName} = Cline v3.38.2 + Dual Mode + Persona + Full Localization`,
      'Keep Cline 100% compatible while adding personalized AI companions, Chatbot/Agent flows, and native docs/UI in 4 languages.',
      `🎭 Persona | 🔄 Dual Mode (${brandName}/Cline) | 🌍 4 languages | 🤖 251 models / 20 providers`,
      `Official ${brandName} provider: monthly free credits to start instantly (Gemini first; ChatGPT/Claude/others to follow).`,
    ],
  },
  ko: {
    heroTitle: `${brandNameKo} 문서에 오신 것을 환영합니다`,
    heroSubtitle: 'Cline을 기반으로 한 AI 코딩 어시스턴트',
    chooseLanguage: '언어를 선택하세요',
    cards: [
      {flag: '🇺🇸', title: 'English', desc: 'Your personalized AI coding partner', button: 'Go to English Docs', href: '/en/getting-started/what-is-careti', locale: 'en'},
      {flag: '🇰🇷', title: '한국어', desc: '나만의 개인화된 AI 코딩 파트너', button: '한국어 문서 보기', href: '/ko/getting-started/what-is-careti', locale: 'ko'},
      {flag: '🇨🇳', title: '中文', desc: '您的个性化 AI 编程伙伴', button: '查看中文文档', href: '/zh/getting-started/what-is-careti', locale: 'zh'},
      {flag: '🇯🇵', title: '日本語', desc: 'あなた専用のパーソナライズド AI コーディングパートナー', button: '日本語ドキュメントを見る', href: '/ja/getting-started/what-is-careti', locale: 'ja'},
    ],
    aboutTitle: `About ${brandName}`,
    aboutLines: [
      `${brandName} = Cline v3.38.2 + 듀얼 모드 + 페르소나 + 풀 로컬라이제이션`,
      'Cline 100% 호환을 유지하면서 개인화 페르소나, Chatbot/Agent 흐름, 4개 언어 UI/문서를 제공합니다.',
      `🎭 페르소나 | 🔄 듀얼 모드(${brandName}/Cline) | 🌍 4개 언어 | 🤖 251개 모델/20개 프로바이더`,
      `공식 ${brandName} 프로바이더: 매월 무료 크레딧으로 즉시 시작(Gemini 우선, ChatGPT/Claude 등 순차 지원).`,
    ],
  },
  ja: {
    heroTitle: `${brandName} ドキュメントへようこそ`,
    heroSubtitle: 'Cline を基盤とした AI コーディングアシスタント',
    chooseLanguage: '言語を選択してください',
    cards: [
      {flag: '🇺🇸', title: 'English', desc: 'Your personalized AI coding partner', button: 'Go to English Docs', href: '/en/getting-started/what-is-careti', locale: 'en'},
      {flag: '🇰🇷', title: '한국어', desc: '나만의 개인화된 AI 코딩 파트너', button: '한국어 문서 보기', href: '/ko/getting-started/what-is-careti', locale: 'ko'},
      {flag: '🇨🇳', title: '中文', desc: '您的个性化 AI 编程伙伴', button: '查看中文文档', href: '/zh/getting-started/what-is-careti', locale: 'zh'},
      {flag: '🇯🇵', title: '日本語', desc: 'あなた専用のパーソナライズド AI コーディングパートナー', button: '日本語ドキュメントを見る', href: '/ja/getting-started/what-is-careti', locale: 'ja'},
    ],
    aboutTitle: `About ${brandName}`,
    aboutLines: [
      `${brandName} = Cline v3.38.2 + デュアルモード + ペルソナ + 多言語化`,
      'Cline 互換を保ちつつ、ペルソナ/Chatbot・Agent フロー、4言語 UI/ドキュメントを提供します。',
      `🎭 ペルソナ | 🔄 デュアルモード(${brandName}/Cline) | 🌍 4言語 | 🤖 251モデル/20プロバイダー`,
      `公式 ${brandName} プロバイダー: 毎月の無料クレジットで即スタート(Gemini から順次)。`,
    ],
  },
  zh: {
    heroTitle: `欢迎使用 ${brandName} 文档`,
    heroSubtitle: '基于 Cline 的 AI 编码助手',
    chooseLanguage: '请选择语言',
    cards: [
      {flag: '🇺🇸', title: 'English', desc: 'Your personalized AI coding partner', button: 'Go to English Docs', href: '/en/getting-started/what-is-careti', locale: 'en'},
      {flag: '🇰🇷', title: '한국어', desc: '나만의 개인화된 AI 코딩 파트너', button: '한국어 문서 보기', href: '/ko/getting-started/what-is-careti', locale: 'ko'},
      {flag: '🇨🇳', title: '中文', desc: '您的个性化 AI 编程伙伴', button: '查看中文文档', href: '/zh/getting-started/what-is-careti', locale: 'zh'},
      {flag: '🇯🇵', title: '日本語', desc: 'あなた専用のパーソナライズド AI コーディングパートナー', button: '日本語ドキュメントを見る', href: '/ja/getting-started/what-is-careti', locale: 'ja'},
    ],
    aboutTitle: `About ${brandName}`,
    aboutLines: [
      `${brandName} = Cline v3.38.2 + 双模式 + 人格系统 + 全面本地化`,
      '保持与 Cline 完全兼容，同时提供个性化人格、Chatbot/Agent 流程及 4 种语言的 UI/文档。',
      `🎭 人格 | 🔄 双模式(${brandName}/Cline) | 🌍 4 种语言 | 🤖 251 模型/20 提供方`,
      `官方 ${brandName} 提供方：每月免费额度可立即开始（先支持 Gemini，后续 ChatGPT/Claude 等）。`,
    ],
  },
});

const detectLocale = (): Locale => {
  if (typeof window === 'undefined') return 'en';
  const stored = window.localStorage.getItem('caretPreferredLang');
  if (stored && localeList.includes(stored as Locale)) return stored as Locale;
  const nav = navigator.language?.toLowerCase().split('-')[0];
  if (nav && localeList.includes(nav as Locale)) return nav as Locale;
  return 'en';
};

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const configBrand = (siteConfig.customFields?.brand as BrandType) || 'careti';

  // Detect brand from hostname at runtime (client-side)
  const [brand, setBrand] = useState<BrandType>(configBrand);
  const [lang, setLang] = useState<Locale>('en');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Detect brand from hostname
    const detectedBrand = detectBrandFromHost(configBrand);
    setBrand(detectedBrand);
    // Detect locale
    const detectedLocale = detectLocale();
    setLang(detectedLocale);
  }, [configBrand]);

  // Derive brand info from detected brand
  const brandName = brandNames[brand].en;
  const brandNameKo = brandNames[brand].ko;
  const brandServiceDomain = 'careti.ai';

  const copy = useMemo(() => getCopy(brandName, brandNameKo), [brandName, brandNameKo]);
  const strings = useMemo(() => copy[lang] ?? copy.en, [copy, lang]);

  const handleLangSelect = (next: Locale, href?: string) => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('caretPreferredLang', next);
    setLang(next);
    if (href) window.location.href = href;
  };

  return (
    <Layout
      title={`${brandName} Documentation`}
      description="AI-powered coding assistant based on Cline">
      <main>
        <div className="container margin-vert--lg">
          <div className="row">
            <div className="col col--8 col--offset-2">
              <div className="text--center margin-vert--lg">
                <Heading as="h1" className="hero__title">
                  {strings.heroTitle}
                </Heading>
                <p className="hero__subtitle">
                  {strings.heroSubtitle}
                </p>
                <div className="lang-switch">
                  {[
                    {locale: 'en', label: 'English'},
                    {locale: 'ko', label: '한국어'},
                    {locale: 'ja', label: '日本語'},
                    {locale: 'zh', label: '中文'},
                  ].map((opt) => (
                    <button
                      key={opt.locale}
                      className={`button button--sm ${lang === opt.locale ? 'button--primary' : 'button--secondary'}`}
                      onClick={() => handleLangSelect(opt.locale as Locale)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                
                <div className="margin-vert--lg">
                  <h2>{strings.chooseLanguage}</h2>
                  <div className="row">
                    {strings.cards.slice(0, 2).map((card) => (
                      <div key={card.locale} className="col col--6">
                        <div className="card lang-card">
                          <div className="card__header">
                            <h3>{`${card.flag} ${card.title}`}</h3>
                          </div>
                          <div className="card__body">
                            <p className="lang-desc">{card.desc}</p>
                            <button
                              className="button button--primary button--block"
                              onClick={() => handleLangSelect(card.locale, card.href)}>
                              {card.button}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="row margin-top--md">
                    {strings.cards.slice(2).map((card) => (
                      <div key={card.locale} className="col col--6">
                        <div className="card lang-card">
                          <div className="card__header">
                            <h3>{`${card.flag} ${card.title}`}</h3>
                          </div>
                          <div className="card__body">
                            <p className="lang-desc">{card.desc}</p>
                            <button
                              className="button button--primary button--block"
                              onClick={() => handleLangSelect(card.locale, card.href)}>
                              {card.button}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="margin-vert--xl">
                  <div className="card">
                    <div className="card__header">
                      <h3>{strings.aboutTitle}</h3>
                    </div>
                    <div className="card__body">
                      {strings.aboutLines.map((line, idx) => (
                        <p key={idx}>{line}</p>
                      ))}
                      <div className="text--center">
                        <a href="https://marketplace.visualstudio.com/items?itemName=caretive.caret" className="button button--primary margin-right--sm">
                          📥 Download from VS Code Marketplace
                        </a>
                        <a href="https://github.com/caretive-ai/project-careti" className="button button--outline button--primary margin-right--sm">
                          🌟 GitHub Repository
                        </a>
                        <a href={`https://${brandServiceDomain}`} className="button button--outline button--secondary">
                          🌐 Official Website
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
