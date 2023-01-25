import { createContext, PropsWithChildren, useEffect, useMemo, useState } from "react"
import { getHighlighter, Highlighter } from "shiki-es"

export const ShikiContext = createContext<{
	highlighter: Highlighter | null
} | null>(null)

export function ShikiProvider({ children }: PropsWithChildren) {
	const [highlighter, setHighlighter] = useState<Highlighter | null>(null)

	useEffect(() => {
		async function fn() {
			const highlighter = await getHighlighter({ themes: ["github-light", "github-dark"], langs: ["sh", "html", "tsx"] })
			setHighlighter(highlighter)
		}
		fn()
	}, [])

	return (
		<ShikiContext.Provider
			value={useMemo(
				() => ({
					highlighter,
				}),
				[highlighter]
			)}
		>
			{children}
		</ShikiContext.Provider>
	)
}
