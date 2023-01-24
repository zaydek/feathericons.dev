import { Head, Html, Main, NextScript } from "next/document"
import { CSSProperties } from "react"
import { detab } from "../lib/format"

// prettier-ignore
const initDarkMode = "\n" + detab(`
	const media = window.matchMedia("(prefers-color-scheme: dark)")
	if (media.matches) {
		document.documentElement.classList.add("dark")
	}
	media.addEventListener("change", e => {
		if (e.matches) {
			document.documentElement.classList.add("dark")
		} else {
			document.documentElement.classList.remove("dark")
		}
	})
`).replaceAll("\t", "  ") + "\n"

export default function Document() {
	return (
		<Html className="overflow-x-hidden overflow-y-scroll scroll-smooth" lang="en">
			<Head />

			{/* Google Fonts */}
			<link rel="preconnect" href="https://fonts.googleapis.com" />
			<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
			<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

			{/* Plausible Analytics */}
			<script defer data-domain="feathericons.dev" src="https://plausible.io/js/script.outbound-links.js"></script>

			{/* Theming */}
			<script dangerouslySetInnerHTML={{ __html: initDarkMode }}></script>
			<body style={{ "--scale": 1, "--stroke-width": 2 } as CSSProperties}>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
