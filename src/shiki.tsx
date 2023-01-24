import { createContext, PropsWithChildren, useEffect, useState } from "react"
import { getHighlighter, Highlighter } from "shiki-es"

export const ShikiContext = createContext<Highlighter | null>(null)

export function ShikiProvider({ children }: PropsWithChildren) {
	const [highlighter, setHighlighter] = useState<Highlighter | null>(null)

	useEffect(() => {
		async function cb() {
			const highlighter = await getHighlighter({ theme: "github-dark", langs: ["sh", "html", "tsx"] })
			setHighlighter(highlighter)
		}
		cb()
	}, [])

	return <ShikiContext.Provider value={highlighter}>{children}</ShikiContext.Provider>
}
