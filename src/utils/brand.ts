/**
 * Brand configuration for multi-domain deployment
 * - docs.caret.team: Legacy domain (Caret/캐럿)
 * - docs.careti.ai: New standard domain (Careti/캐러티)
 */

export type BrandType = "caret" | "careti"

export interface BrandConfig {
  name: string
  nameKo: string
  domain: string
  serviceDomain: string
}

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
export function getBrandConfig(): BrandConfig {
  return BRANDS[getBrandFromEnv()]
}
