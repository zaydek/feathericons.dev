export function getDarkMode() {
	return document.documentElement.getAttribute("data-theme") === "dark"
}
