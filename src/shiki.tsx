import { createContext, PropsWithChildren, useEffect, useState } from "react"
import { getHighlighter, Highlighter } from "shiki-es"

export const ShikiContext = createContext<Highlighter | null>(null)

export function ShikiProvider({ children }: PropsWithChildren) {
	const [highlighter, setHighlighter] = useState<Highlighter | null>(null)

	useEffect(() => {
		async function fn() {
			const highlighter = await getHighlighter({ theme: "github-dark", langs: ["sh", "html", "tsx"] })
			setHighlighter(highlighter)
		}
		fn()
	}, [])

	return <ShikiContext.Provider value={highlighter}>{children}</ShikiContext.Provider>
}
