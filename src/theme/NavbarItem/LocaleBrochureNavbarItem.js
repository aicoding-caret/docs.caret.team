// CARET MODIFICATION: Locale-aware enterprise brochure link.
import { useLocation } from "@docusaurus/router"
import clsx from "clsx"

const localePrefixes = ["en", "ko", "ja", "zh"]

const getLocaleFromPath = (pathname) => {
	const trimmed = pathname.startsWith("/") ? pathname.slice(1) : pathname
	const prefix = trimmed.split("/")[0]
	return localePrefixes.includes(prefix) ? prefix : "en"
}

export default function LocaleBrochureNavbarItem(props) {
	const { pathname } = useLocation()
	const locale = getLocaleFromPath(pathname)
	const href = `https://caret.team/${locale}/brochure`

	return (
		<a className={clsx("navbar__item", "navbar__link", props.className)} href={href} rel="noreferrer" target="_self">
			{props.label}
		</a>
	)
}
