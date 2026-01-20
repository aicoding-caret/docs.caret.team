import React, { useEffect, useState } from "react"
import { useLocation } from "@docusaurus/router"
import { type BrandType, type Locale, getBrandFromHost, getBrandName, BRAND_NAMES } from "../utils/brand"

const locales: Locale[] = ["en", "ko", "ja", "zh", "fr", "de", "ru"]

function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split("/").filter(Boolean)
  const first = segments[0] as Locale
  return locales.includes(first) ? first : "en"
}

interface BrandNameProps {
  /**
   * Korean particle to append (for Korean locale only)
   * - "topic": 은/는 (캐럿은, 캐러티는)
   * - "subject": 이/가 (캐럿이, 캐러티가)
   * - "object": 을/를 (캐럿을, 캐러티를)
   * - "and": 과/와 (캐럿과, 캐러티와)
   * - "of": 의 (캐럿의, 캐러티의)
   * - "to": 으로/로 (캐럿으로, 캐러티로)
   * - "at": 에 (캐럿에, 캐러티에)
   * - "from": 에서 (캐럿에서, 캐러티에서)
   * - "topicQuestion": 이란/란 (캐럿이란, 캐러티란)
   * - "also": 도 (캐럿도, 캐러티도)
   * - "only": 만 (캐럿만, 캐러티만)
   */
  particle?: "topic" | "subject" | "object" | "and" | "of" | "to" | "at" | "from" | "topicQuestion" | "also" | "only"
}

// Korean particles based on whether the word has 받침 (final consonant)
// [with 받침, without 받침]
const PARTICLES: Record<string, [string, string]> = {
  topic: ["은", "는"],           // 받침 있으면 은, 없으면 는
  subject: ["이", "가"],         // 받침 있으면 이, 없으면 가
  object: ["을", "를"],          // 받침 있으면 을, 없으면 를
  and: ["과", "와"],             // 받침 있으면 과, 없으면 와
  of: ["의", "의"],              // 의는 동일
  to: ["으로", "로"],            // 받침 있으면 으로, 없으면 로
  at: ["에", "에"],              // 에는 동일
  from: ["에서", "에서"],        // 에서는 동일
  topicQuestion: ["이란", "란"], // 받침 있으면 이란, 없으면 란
  also: ["도", "도"],            // 도는 동일
  only: ["만", "만"],            // 만은 동일
}

// 캐럿 has 받침 (ㅅ), 캐러티 doesn't have 받침
const HAS_BATCHIM: Record<BrandType, boolean> = {
  caret: true,   // 캐럿 - has ㅅ
  careti: false, // 캐러티 - no 받침
}

/**
 * BrandName component - shows brand name based on current domain and locale
 * Use this in MDX files: <BrandName /> or <BrandName particle="topic" />
 */
export default function BrandName({ particle }: BrandNameProps): JSX.Element {
  const { pathname } = useLocation()
  const [brand, setBrand] = useState<BrandType>("careti")
  const [locale, setLocale] = useState<Locale>("en")

  useEffect(() => {
    setBrand(getBrandFromHost())
    setLocale(getLocaleFromPath(pathname))
  }, [pathname])

  const brandName = getBrandName(brand, locale)

  // Add Korean particle if specified and locale is Korean
  if (particle && locale === "ko") {
    const hasBatchim = HAS_BATCHIM[brand]
    const particlePair = PARTICLES[particle]
    const particleToUse = hasBatchim ? particlePair[0] : particlePair[1]
    return <>{brandName}{particleToUse}</>
  }

  return <>{brandName}</>
}

// Export for use in other components
export { BrandName }
