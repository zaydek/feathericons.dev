import "./syntax-highlighting.sass"

import { ShikiContext } from "@/state"
import { useContext, useEffect, useState } from "react"
import { IThemedToken, Lang } from "shiki-es"

//// export function SyntaxHighlighting({ lang, code }: { lang: Lang; code: string }) {
//// 	const { highlighter } = useContext(ShikiContext)!
////
//// 	const [tokens, setTokens] = useState<IThemedToken[][] | null>(null)
////
//// 	useEffect(() => {
//// 		if (highlighter === null) return
//// 		const tokens = highlighter.codeToThemedTokens(code, lang, "github-light")
//// 		setTokens(tokens)
//// 	}, [code, highlighter, lang])
////
//// 	return (
//// 		<pre className="pre">
//// 			<code className="pre-code">
//// 				{tokens === null
//// 					? // No syntax highlighting
//// 					  code.split("\n").map((ys, y) => (
//// 							<div key={y}>
//// 								{ys || <br />}
//// 							</div>
//// 					  ))
//// 					: // Syntax highlighting
//// 					  tokens.map((ys, y) => (
//// 							<div key={y}>
//// 								{ys.length > 0 ? (
//// 									ys.map(({ color, content }, x) => (
//// 										<span key={x} style={{ color }}>
//// 											{content}
//// 										</span>
//// 									))
//// 								) : (
//// 									<br />
//// 								)}
//// 							</div>
//// 					  ))}
//// 			</code>
//// 		</pre>
//// 	)
//// }

export function SyntaxHighlighting({ lang, code }: { lang: Lang; code: string }) {
	const { highlighter } = useContext(ShikiContext)!

	const [tokens, setTokens] = useState<IThemedToken[][] | null>(null)

	useEffect(() => {
		if (highlighter === null) return
		const tokens = highlighter.codeToThemedTokens(code, lang, "github-light")
		setTokens(tokens)
	}, [code, highlighter, lang])

	return (
		<pre className="pre">
			<code className="pre-code">
				{tokens === null
					? code.split("\n").map((ys, y) => <div key={y}>{ys || <br />}</div>)
					: tokens.map((ys, y) => (
							<div key={y}>
								{ys.length > 0 ? (
									ys.map(({ color, content }, x) => (
										<span key={x} style={{ color }}>
											{content}
										</span>
									))
								) : (
									<br />
								)}
							</div>
					  ))}
			</code>
		</pre>
	)
}
