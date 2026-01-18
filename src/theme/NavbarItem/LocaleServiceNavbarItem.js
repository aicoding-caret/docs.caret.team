// CARET MODIFICATION: Locale-aware service link for multi-doc layout.
import { useLocation } from "@docusaurus/router"
import clsx from "clsx"
import { useEffect, useState } from "react"

const localePrefixes = ["en", "ko", "ja", "zh", "fr", "de", "ru"]

const getLocaleFromPath = (pathname) => {
	const trimmed = pathname.startsWith("/") ? pathname.slice(1) : pathname
	const prefix = trimmed.split("/")[0]
	return localePrefixes.includes(prefix) ? prefix : "en"
}

const hasExplicitLocale = (pathname) =>
	localePrefixes.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`))

const resolveLocale = (pathname) => {
	const pathLocale = getLocaleFromPath(pathname)
	if (hasExplicitLocale(pathname) || typeof window === "undefined") {
		return pathLocale
	}
	const stored = window.localStorage.getItem("caretPreferredLang")
	if (stored && localePrefixes.includes(stored)) {
		return stored
	}
	return pathLocale
}

export default function LocaleServiceNavbarItem(props) {
	const { pathname } = useLocation()
	const [locale, setLocale] = useState(() => resolveLocale(pathname))
	const labels = props.labels ?? {}
	const label = labels[locale] ?? props.label
	const href = `https://caret.team/${locale}`

	useEffect(() => {
		setLocale(resolveLocale(pathname))
	}, [pathname])

	useEffect(() => {
		if (typeof window === "undefined") return
		const onStorage = (event) => {
			if (event.key !== "caretPreferredLang" || typeof event.newValue !== "string") return
			const next = event.newValue
			if (localePrefixes.includes(next)) setLocale(next)
		}
		const onLangChange = (event) => {
			const detail = event.detail || {}
			const next = detail.locale
			if (next && localePrefixes.includes(next)) setLocale(next)
		}
		window.addEventListener("storage", onStorage)
		window.addEventListener("caret:lang-change", onLangChange)
		return () => {
			window.removeEventListener("storage", onStorage)
			window.removeEventListener("caret:lang-change", onLangChange)
		}
	}, [])

	return (
		<a className={clsx("navbar__item", "navbar__link", props.className)} href={href} rel="noreferrer" target="_self">
			{label}
		</a>
	)
}
