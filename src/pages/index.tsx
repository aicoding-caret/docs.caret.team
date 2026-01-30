import type {ReactNode} from 'react';
import {useEffect, useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

type Locale = 'en' | 'ko' | 'ja' | 'zh' | 'de' | 'fr' | 'ru';
type BrandType = 'caret' | 'careti';

// Domain to brand mapping for runtime detection
const BRAND_DOMAINS: Record<string, BrandType> = {
  'docs.careti.ai': 'careti',
  'careti.ai': 'careti',
  'localhost': 'careti', // Development default
};

// Brand-specific content mapping
const brandNames: Record<BrandType, {en: string; ko: string; ja: string; zh: string; de: string; fr: string; ru: string}> = {
  caret: {en: 'Caret', ko: '캐럿', ja: 'Caret', zh: 'Caret', de: 'Caret', fr: 'Caret', ru: 'Caret'},
  careti: {en: 'Careti', ko: '캐러티', ja: 'Careti', zh: 'Careti', de: 'Careti', fr: 'Careti', ru: 'Careti'},
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

const localeList: Locale[] = ['en', 'ko', 'ja', 'zh', 'de', 'fr', 'ru'];

type LangCopy = {
  heroTitle: string;
  heroSubtitle: string;
  chooseLanguage: string;
  cards: {flag: string; title: string; desc: string; button: string; href: string; locale: Locale}[];
  aboutTitle: string;
  aboutLines: string[];
};

// Common card definitions for all locales
const getCards = () => [
  {flag: '🇺🇸', title: 'English', desc: 'Your personalized AI coding partner', button: 'English Docs', href: '/en/getting-started/what-is-careti', locale: 'en' as Locale},
  {flag: '🇰🇷', title: '한국어', desc: '나만의 개인화된 AI 코딩 파트너', button: '한국어 문서', href: '/ko/getting-started/what-is-careti', locale: 'ko' as Locale},
  {flag: '🇯🇵', title: '日本語', desc: 'パーソナライズド AI コーディングパートナー', button: '日本語ドキュメント', href: '/ja/getting-started/what-is-careti', locale: 'ja' as Locale},
  {flag: '🇨🇳', title: '中文', desc: '您的个性化 AI 编程伙伴', button: '中文文档', href: '/zh/getting-started/what-is-careti', locale: 'zh' as Locale},
  {flag: '🇩🇪', title: 'Deutsch', desc: 'Ihr personalisierter KI-Codierungspartner', button: 'Deutsche Docs', href: '/de/getting-started/what-is-careti', locale: 'de' as Locale},
  {flag: '🇫🇷', title: 'Français', desc: 'Votre partenaire IA de codage personnalisé', button: 'Docs Français', href: '/fr/getting-started/what-is-careti', locale: 'fr' as Locale},
  {flag: '🇷🇺', title: 'Русский', desc: 'Ваш персонализированный AI-помощник', button: 'Русская документация', href: '/ru/getting-started/what-is-careti', locale: 'ru' as Locale},
];

// Generate copy with brand name substitution
const getCopy = (brandName: string, brandNameKo: string): Record<Locale, LangCopy> => ({
  en: {
    heroTitle: `Welcome to ${brandName} Documentation`,
    heroSubtitle: 'AI-powered coding assistant based on Cline',
    chooseLanguage: 'Choose Your Language',
    cards: getCards(),
    aboutTitle: `About ${brandName}`,
    aboutLines: [
      `${brandName} = Cline + Dual Mode + Persona + 7 Languages + Image/Document Tools`,
      'Keep Cline 100% compatible while adding personalized AI companions, Chatbot/Agent flows, and native docs/UI in 7 languages.',
      `🎭 Persona | 🔄 Dual Mode (${brandName}/Cline) | 🌍 7 Languages | 🤖 266 models / 31 providers`,
      `Official ${brandName} provider: monthly free credits to start instantly.`,
    ],
  },
  ko: {
    heroTitle: `${brandNameKo} 문서에 오신 것을 환영합니다`,
    heroSubtitle: 'Cline을 기반으로 한 AI 코딩 어시스턴트',
    chooseLanguage: '언어를 선택하세요',
    cards: getCards(),
    aboutTitle: `About ${brandName}`,
    aboutLines: [
      `${brandName} = Cline + 듀얼 모드 + 페르소나 + 7개 언어 + 이미지/문서 도구`,
      'Cline 100% 호환을 유지하면서 개인화 페르소나, Chatbot/Agent 흐름, 7개 언어 UI/문서를 제공합니다.',
      `🎭 페르소나 | 🔄 듀얼 모드(${brandName}/Cline) | 🌍 7개 언어 | 🤖 266개 모델/31개 프로바이더`,
      `공식 ${brandName} 프로바이더: 매월 무료 크레딧으로 즉시 시작.`,
    ],
  },
  ja: {
    heroTitle: `${brandName} ドキュメントへようこそ`,
    heroSubtitle: 'Cline を基盤とした AI コーディングアシスタント',
    chooseLanguage: '言語を選択してください',
    cards: getCards(),
    aboutTitle: `About ${brandName}`,
    aboutLines: [
      `${brandName} = Cline + デュアルモード + ペルソナ + 7言語 + 画像/ドキュメントツール`,
      'Cline 互換を保ちつつ、ペルソナ/Chatbot・Agent フロー、7言語 UI/ドキュメントを提供します。',
      `🎭 ペルソナ | 🔄 デュアルモード(${brandName}/Cline) | 🌍 7言語 | 🤖 266モデル/31プロバイダー`,
      `公式 ${brandName} プロバイダー: 毎月の無料クレジットで即スタート。`,
    ],
  },
  zh: {
    heroTitle: `欢迎使用 ${brandName} 文档`,
    heroSubtitle: '基于 Cline 的 AI 编码助手',
    chooseLanguage: '请选择语言',
    cards: getCards(),
    aboutTitle: `About ${brandName}`,
    aboutLines: [
      `${brandName} = Cline + 双模式 + 人格系统 + 7种语言 + 图像/文档工具`,
      '保持与 Cline 完全兼容，同时提供个性化人格、Chatbot/Agent 流程及 7 种语言的 UI/文档。',
      `🎭 人格 | 🔄 双模式(${brandName}/Cline) | 🌍 7 种语言 | 🤖 266 模型/31 提供方`,
      `官方 ${brandName} 提供方：每月免费额度可立即开始。`,
    ],
  },
  de: {
    heroTitle: `Willkommen zur ${brandName} Dokumentation`,
    heroSubtitle: 'KI-gestützter Codierungsassistent basierend auf Cline',
    chooseLanguage: 'Wählen Sie Ihre Sprache',
    cards: getCards(),
    aboutTitle: `Über ${brandName}`,
    aboutLines: [
      `${brandName} = Cline + Dual Mode + Persona + 7 Sprachen + Bild-/Dokumenttools`,
      '100% Cline-kompatibel mit personalisierten KI-Begleitern, Chatbot/Agent-Flows und UI/Docs in 7 Sprachen.',
      `🎭 Persona | 🔄 Dual Mode (${brandName}/Cline) | 🌍 7 Sprachen | 🤖 266 Modelle / 31 Anbieter`,
      `Offizieller ${brandName}-Anbieter: Monatliche Gratis-Credits zum sofortigen Start.`,
    ],
  },
  fr: {
    heroTitle: `Bienvenue dans la documentation ${brandName}`,
    heroSubtitle: 'Assistant de codage IA basé sur Cline',
    chooseLanguage: 'Choisissez votre langue',
    cards: getCards(),
    aboutTitle: `À propos de ${brandName}`,
    aboutLines: [
      `${brandName} = Cline + Mode Dual + Persona + 7 Langues + Outils Image/Document`,
      '100% compatible Cline avec des compagnons IA personnalisés, flux Chatbot/Agent, et UI/docs en 7 langues.',
      `🎭 Persona | 🔄 Mode Dual (${brandName}/Cline) | 🌍 7 Langues | 🤖 266 modèles / 31 fournisseurs`,
      `Fournisseur officiel ${brandName}: Crédits gratuits mensuels pour démarrer instantanément.`,
    ],
  },
  ru: {
    heroTitle: `Добро пожаловать в документацию ${brandName}`,
    heroSubtitle: 'AI-ассистент программирования на базе Cline',
    chooseLanguage: 'Выберите язык',
    cards: getCards(),
    aboutTitle: `О ${brandName}`,
    aboutLines: [
      `${brandName} = Cline + Dual Mode + Персоны + 7 Языков + Инструменты изображений/документов`,
      '100% совместимость с Cline + персонализированные AI-компаньоны, потоки Chatbot/Agent и UI/документация на 7 языках.',
      `🎭 Персоны | 🔄 Dual Mode (${brandName}/Cline) | 🌍 7 Языков | 🤖 266 моделей / 31 провайдер`,
      `Официальный провайдер ${brandName}: Ежемесячные бесплатные кредиты для мгновенного старта.`,
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
                    {locale: 'en', label: 'EN'},
                    {locale: 'ko', label: '한'},
                    {locale: 'ja', label: '日'},
                    {locale: 'zh', label: '中'},
                    {locale: 'de', label: 'DE'},
                    {locale: 'fr', label: 'FR'},
                    {locale: 'ru', label: 'RU'},
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
                    {strings.cards.slice(0, 4).map((card) => (
                      <div key={card.locale} className="col col--3">
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

                  <div className="row margin-top--md" style={{justifyContent: 'center'}}>
                    {strings.cards.slice(4).map((card) => (
                      <div key={card.locale} className="col col--3">
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
