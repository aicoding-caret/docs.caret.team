// CARET MODIFICATION: Extend navbar item types for locale-aware brochure link.
import DefaultNavbarItem from "@theme/NavbarItem/DefaultNavbarItem"
import DropdownNavbarItem from "@theme/NavbarItem/DropdownNavbarItem"
import LocaleDropdownNavbarItem from "@theme/NavbarItem/LocaleDropdownNavbarItem"
import SearchNavbarItem from "@theme/NavbarItem/SearchNavbarItem"
import HtmlNavbarItem from "@theme/NavbarItem/HtmlNavbarItem"
import DocNavbarItem from "@theme/NavbarItem/DocNavbarItem"
import DocSidebarNavbarItem from "@theme/NavbarItem/DocSidebarNavbarItem"
import DocsVersionNavbarItem from "@theme/NavbarItem/DocsVersionNavbarItem"
import DocsVersionDropdownNavbarItem from "@theme/NavbarItem/DocsVersionDropdownNavbarItem"
import LocaleBrochureNavbarItem from "@theme/NavbarItem/LocaleBrochureNavbarItem"
import DownloadDropdownNavbarItem from "@theme/NavbarItem/DownloadDropdownNavbarItem"
import LocaleLanguageDropdownNavbarItem from "@theme/NavbarItem/LocaleLanguageDropdownNavbarItem"
import LocaleServiceNavbarItem from "@theme/NavbarItem/LocaleServiceNavbarItem"

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
