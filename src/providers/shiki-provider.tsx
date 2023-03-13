import react from "react"

import { getHighlighter, Highlighter } from "shiki-es"

export const ShikiContext = react.createContext<{ highlighter: Highlighter | null } | null>(null)

export function ShikiProvider({ children }: react.PropsWithChildren) {
	const [highlighter, setHighlighter] = react.useState<Highlighter | null>(null)

	react.useEffect(() => {
		async function init() {
			const highlighter = await getHighlighter({
				themes: ["github-light", "github-dark"],
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