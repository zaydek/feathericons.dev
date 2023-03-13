import react from "react"

import * as shiki from "shiki-es"

export const ShikiContext = react.createContext<{ highlighter: shiki.Highlighter | null } | null>(null)

export function ShikiProvider({ children }: react.PropsWithChildren) {
	const [highlighter, setHighlighter] = react.useState<shiki.Highlighter | null>(null)

	react.useEffect(() => {
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
