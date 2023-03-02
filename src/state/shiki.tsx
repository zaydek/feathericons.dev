import { createContext, PropsWithChildren, useEffect, useState } from "react"
import { getHighlighter, Highlighter } from "shiki-es"

// prettier-ignore
export const ShikiContext =
	createContext<{
		highlighter: Highlighter | null
	} | null>(null)

export function ShikiProvider({ children }: PropsWithChildren) {
	const [highlighter, setHighlighter] = useState<Highlighter | null>(null)

	useEffect(() => {
		async function fn() {
			const highlighter = await getHighlighter({
				themes: ["github-light", "github-dark"],
				langs: ["html", "tsx"],
			})
			setHighlighter(highlighter)
		}
		fn()
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
