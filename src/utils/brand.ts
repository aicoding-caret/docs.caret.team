/**
 * Brand configuration for multi-domain deployment
 * - docs.caret.team: Legacy domain (Caret/캐럿)
 * - docs.careti.ai: New standard domain (Careti/캐러티)
 */

export type BrandType = "caret" | "careti"
export type Locale = "en" | "ko" | "ja" | "zh" | "fr" | "de" | "ru"

export interface BrandConfig {
  name: string
  nameKo: string
  domain: string
  serviceDomain: string
}

// Domain to brand mapping
export const BRAND_DOMAINS: Record<string, BrandType> = {
  "docs.caret.team": "caret",
  "caret.team": "caret",
  "docs.careti.ai": "careti",
  "careti.ai": "careti",
  "localhost": "careti", // Development default
}

// Brand configurations
export const BRANDS: Record<BrandType, BrandConfig> = {
  caret: {
    name: "Caret",
    nameKo: "캐럿",
    domain: "docs.caret.team",
    serviceDomain: "caret.team",
  },
  careti: {
    name: "Careti",
    nameKo: "캐러티",
    domain: "docs.careti.ai",
    serviceDomain: "careti.ai",
  },
}

// Brand names by locale
export const BRAND_NAMES: Record<BrandType, Record<Locale, string>> = {
  caret: { en: "Caret", ko: "캐럿", ja: "Caret", zh: "Caret", fr: "Caret", de: "Caret", ru: "Caret" },
  careti: { en: "Careti", ko: "캐러티", ja: "Careti", zh: "Careti", fr: "Careti", de: "Careti", ru: "Careti" },
}

/**
 * Get brand from hostname (client-side)
 */
export function getBrandFromHost(hostname?: string): BrandType {
  const host = hostname || (typeof window !== "undefined" ? window.location.hostname : "")

  // Check exact match first
  if (BRAND_DOMAINS[host]) {
    return BRAND_DOMAINS[host]
  }

  // Check if hostname contains the domain
  for (const [domain, brand] of Object.entries(BRAND_DOMAINS)) {
    if (host.includes(domain)) {
      return brand
    }
  }

  return getBrandFromEnv()
}

/**
 * Get brand from environment variable
 * Use BRAND env var (not NEXT_PUBLIC_ since this is Docusaurus)
 */
export function getBrandFromEnv(): BrandType {
  const envBrand = process.env.BRAND
  if (envBrand === "caret" || envBrand === "careti") {
    return envBrand
  }
  return "careti" // Default: new standard
}

/**
 * Get brand configuration
 */
export function getBrandConfig(brand?: BrandType): BrandConfig {
  return BRANDS[brand || getBrandFromEnv()]
}

/**
 * Get brand name for locale
 */
export function getBrandName(brand: BrandType, locale: Locale): string {
  return BRAND_NAMES[brand][locale] || BRAND_NAMES[brand].en
}
