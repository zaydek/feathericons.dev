import { createContext, PropsWithChildren, useMemo, useState } from "react"
import { Highlighter } from "shiki-es"

export const ShikiContext = createContext<{
	highlighter: Highlighter | null
} | null>(null)

export function ShikiProvider({ children }: PropsWithChildren) {
	const [highlighter, setHighlighter] = useState<Highlighter | null>(null)

	//// useEffect(() => {
	//// 	async function fn() {
	//// 		const highlighter = await getHighlighter({ theme: "github-dark", langs: ["sh", "xml", "html", "tsx"] })
	//// 		setHighlighter(highlighter)
	//// 	}
	//// 	fn()
	//// }, [])

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
