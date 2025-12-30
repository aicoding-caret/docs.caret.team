// CARET MODIFICATION: Extend navbar item types for locale-aware brochure link.
import DefaultNavbarItem from "@theme/NavbarItem/DefaultNavbarItem"
import DocNavbarItem from "@theme/NavbarItem/DocNavbarItem"
import DocSidebarNavbarItem from "@theme/NavbarItem/DocSidebarNavbarItem"
import DocsVersionDropdownNavbarItem from "@theme/NavbarItem/DocsVersionDropdownNavbarItem"
import DocsVersionNavbarItem from "@theme/NavbarItem/DocsVersionNavbarItem"
import DownloadDropdownNavbarItem from "@theme/NavbarItem/DownloadDropdownNavbarItem"
import DropdownNavbarItem from "@theme/NavbarItem/DropdownNavbarItem"
import HtmlNavbarItem from "@theme/NavbarItem/HtmlNavbarItem"
import LocaleBrochureNavbarItem from "@theme/NavbarItem/LocaleBrochureNavbarItem"
import LocaleDropdownNavbarItem from "@theme/NavbarItem/LocaleDropdownNavbarItem"
import LocaleLanguageDropdownNavbarItem from "@theme/NavbarItem/LocaleLanguageDropdownNavbarItem"
import LocaleServiceNavbarItem from "@theme/NavbarItem/LocaleServiceNavbarItem"
import SearchNavbarItem from "@theme/NavbarItem/SearchNavbarItem"

const ComponentTypes = {
	default: DefaultNavbarItem,
	localeDropdown: LocaleDropdownNavbarItem,
	search: SearchNavbarItem,
	dropdown: DropdownNavbarItem,
	html: HtmlNavbarItem,
	doc: DocNavbarItem,
	docSidebar: DocSidebarNavbarItem,
	docsVersion: DocsVersionNavbarItem,
	docsVersionDropdown: DocsVersionDropdownNavbarItem,
	"custom-localeBrochure": LocaleBrochureNavbarItem,
	"custom-downloadDropdown": DownloadDropdownNavbarItem,
	"custom-localeLanguageDropdown": LocaleLanguageDropdownNavbarItem,
	"custom-localeService": LocaleServiceNavbarItem,
}

export default ComponentTypes
