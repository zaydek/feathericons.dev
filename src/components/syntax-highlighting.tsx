import "./syntax-highlighting.sass"

import { ShikiContext } from "@/state"
import { Fragment, useContext, useEffect, useState } from "react"
import { IThemedToken } from "shiki-es"

// prettier-ignore
function TwitterLink({ username, children }: { username: string; children: string }) {
	const href = `https://twitter.com/${username}`
	return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
}

// prettier-ignore
function Link({ href, children }: { href: string; children: string }) {
	return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
}

// prettier-ignore
function RenderLink({ children }: { children: string }) {
	return children.startsWith("@")
		? <TwitterLink username={children.substring(1)}>{children}</TwitterLink>
		: <Link href={children}>{children}</Link>
}

const re = /(.*)(?!http:\/\/www\.w3\.org\/2000\/svg)(@[^\s]+|https?:\/\/[^\s]+)(.*)/g

function Token({ color, children }: { color?: string; children: string }) {
	const matches = [...children.matchAll(re)]
	return (
		<span style={{ color }}>
			{matches.length > 0
				? matches.map(([_, $1, $2, $3], index) => (
						<Fragment key={index}>
							{$1}
							<RenderLink>{$2}</RenderLink>
							{$3}
						</Fragment>
				  ))
				: children}
		</span>
	)
}

export function SyntaxHighlighting({ lang, code }: { lang: string; code: string }) {
	const { highlighter } = useContext(ShikiContext)!
	const [tokens, setTokens] = useState<IThemedToken[][] | null>(null)

	useEffect(() => {
		if (highlighter === null) return
		const tokens = highlighter.codeToThemedTokens(code, lang, "github-light")
		setTokens(tokens)
	}, [code, highlighter, lang])

	return (
		<pre
			className="syntax-highlighting"
			onClick={e => {
				e.preventDefault()
				e.stopPropagation()
			}}
		>
			<code className="syntax-highlighting-code">
				{tokens === null ? (
					"TODO"
				) : (
					<>
						{tokens.map((lineTokens, index) => (
							<div key={index}>
								{lineTokens.length > 0 ? (
									lineTokens.map((token, index) => (
										<Token key={index} color={token.color}>
											{token.content}
										</Token>
									))
								) : (
									<br />
								)}
							</div>
						))}
					</>
				)}
			</code>
		</pre>
	)
}
