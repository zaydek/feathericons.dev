import React from "react"

import * as shiki from "shiki-es"

export const ShikiContext = React.createContext<{ highlighter: shiki.Highlighter | null } | null>(null)

export function ShikiProvider({ children }: React.PropsWithChildren) {
	const [highlighter, setHighlighter] = React.useState<shiki.Highlighter | null>(null)

	React.useEffect(() => {
		async function init() {
			const highlighter = await shiki.getHighlighter({
				//// themes: ["github-light", "github-dark"],
				themes: ["github-light"],
				langs: ["html", "tsx"],
			})
			setHighlighter(highlighter)
		}
		init()
	}, [])

	return (
		<ShikiContext.Provider
			value={{
				highlighter,
			}}
		>
			{children}
		</ShikiContext.Provider>
	)
}
