import { Head, Html, Main, NextScript } from "next/document"
import Script from "next/script"
import { CSSProperties, PropsWithChildren } from "react"
import { detab } from "../lib/format"

function Production({ children }: PropsWithChildren) {
	return <>{process.env.NODE_ENV === "production" ? children : null}</>
}

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				{/* Plausible Analytics */}
				<Production>
					<Script defer data-domain="feathericons.dev" src="https://plausible.io/js/script.outbound-links.js" />
				</Production>
				{/* Theming */}
				{/* prettier-ignore */}
				<Script id="script-theme" dangerouslySetInnerHTML={{ __html: "\n" + detab(`
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
				`).replaceAll("\t", "  ") + "\n" }} />
			</Head>
			<body style={{ "--SCALE": 1, "--STROKE-WIDTH": 2 } as CSSProperties}>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
