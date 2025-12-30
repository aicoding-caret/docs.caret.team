import Head from "@docusaurus/Head"
import { useLocation } from "@docusaurus/router"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import type LayoutHeadType from "@theme/LayoutHead"
import OriginalLayoutHead from "@theme-original/LayoutHead"

const localeImageMap: Record<string, string> = {
	ko: "/og/ogtag-ko.webp",
	ja: "/og/ogtag-ja.webp",
	zh: "/og/ogtag-zh.webp",
}

const ogLocaleMap: Record<string, string> = {
	en: "en_US",
	ko: "ko_KR",
	ja: "ja_JP",
	zh: "zh_CN",
}

const fallbackImage = "/og/ogtag-en.webp"

function pickLocalePrefix(pathname: string): string {
	const trimmed = pathname.startsWith("/") ? pathname.slice(1) : pathname
	return trimmed.split("/")[0]
}

function pickImage(pathname: string): string {
	const localePrefix = pickLocalePrefix(pathname)
	return localeImageMap[localePrefix] ?? fallbackImage
}

const LayoutHead: LayoutHeadType = (props) => {
	const { siteConfig } = useDocusaurusContext()
	const { pathname } = useLocation()

	const localePrefix = pickLocalePrefix(pathname)
	const imagePath = pickImage(pathname)
	const siteUrl = siteConfig.url?.replace(/\/$/, "")
	const imageUrl = imagePath.startsWith("http") || !siteUrl ? imagePath : `${siteUrl}${imagePath}`
	const ogLocale = ogLocaleMap[localePrefix] ?? ogLocaleMap.en
	const alternateLocales = Object.values(ogLocaleMap).filter((value) => value !== ogLocale)

	return (
		<>
			<OriginalLayoutHead {...props} />
			<Head>
				<meta content={imageUrl} property="og:image" />
				<meta content={imageUrl} name="twitter:image" />
				<meta content={ogLocale} property="og:locale" />
				{alternateLocales.map((value) => (
					<meta content={value} key={value} property="og:locale:alternate" />
				))}
			</Head>
		</>
	)
}

export default LayoutHead
