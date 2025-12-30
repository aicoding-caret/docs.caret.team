// CARET MODIFICATION: Locale-aware download dropdown items.

import { useLocation } from "@docusaurus/router"
import DropdownNavbarItem from "@theme/NavbarItem/DropdownNavbarItem"
import React, { useEffect, useState } from "react"

const localePrefixes = ["en", "ko", "ja", "zh"]

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

const buildItems = (locale) => [
	{
		label: "VS Code Marketplace",
		href: "https://marketplace.visualstudio.com/items?itemName=caretive.caret",
	},
	{
		label: "Open VSX",
		href: "https://open-vsx.org/extension/Caretive/caret",
	},
	{
		label: "Brochure",
		href: `https://caret.team/${locale}/brochure`,
	},
]

export default function DownloadDropdownNavbarItem({ items, labels, ...props }) {
	const { pathname } = useLocation()
	const [locale, setLocale] = useState(() => resolveLocale(pathname))
	const resolvedItems = buildItems(locale)
	const label = labels?.[locale] ?? props.label

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

	return <DropdownNavbarItem {...props} items={resolvedItems} label={label} />
}
