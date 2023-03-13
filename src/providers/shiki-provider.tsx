import { createContext, PropsWithChildren, useEffect, useState } from "react"
import { getHighlighter, Highlighter } from "shiki-es"

export const ShikiContext = createContext<{ highlighter: Highlighter | null } | null>(null)

export function ShikiProvider({ children }: PropsWithChildren) {
	const [highlighter, setHighlighter] = useState<Highlighter | null>(null)

	useEffect(() => {
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
