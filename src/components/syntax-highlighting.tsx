import React from "react"

import * as shiki from "shiki-es"

import { Anchor } from "@/components"
import { ShikiContext } from "@/providers"

// https://twitter.com/...
function TwitterLink({ username, children }: { username: string; children: string }) {
	const href = `https://twitter.com/${username}`
	return <Anchor href={href}>{children}</Anchor>
}

// https://...
function Link({ href, children }: { href: string; children: string }) {
	return <Anchor href={href}>{children}</Anchor>
}

function RenderLink({ children }: { children: string }) {
	if (children.startsWith("@")) {
		return <TwitterLink username={children.substring(1)}>{children}</TwitterLink>
	} else {
		return <Link href={children}>{children}</Link>
	}
}

const urlRegex = /(.*)(?!http:\/\/www\.w3\.org\/2000\/svg)(@[^\s]+|https?:\/\/[^\s]+)(.*)/g

function Tokenize({ color, children }: { color?: string; children: string }) {
	const arr = [...children.matchAll(urlRegex)]
	return (
		<span style={{ color }}>
			{arr.length > 0
				? arr.map(([_, $1, $2, $3], index) => (
						<React.Fragment key={index}>
							{$1}
							<RenderLink>{$2}</RenderLink>
							{$3}
						</React.Fragment>
				  ))
				: children}
		</span>
	)
}

function SyntaxHighlighting({ lang, code }: { lang: string; code: string }) {
	const { highlighter } = React.useContext(ShikiContext)!
	const [tokens, setTokens] = React.useState<shiki.IThemedToken[][] | null>(null)

	React.useEffect(() => {
		if (highlighter === null) return
		const tokens = highlighter.codeToThemedTokens(code, code.startsWith("//") ? "js" : lang, "github-light")
		setTokens(tokens)
	}, [code, highlighter, lang])

	return (
		<pre className="syntax-highlighting">
			<code className="syntax-highlighting-code">
				{tokens === null
					? code.split("\n").map((line, index) => (
							// Lines
							<div key={index}>
								{line.length > 0 ? (
									// Tokens
									<Tokenize color="rgb(110, 119, 129)">{line}</Tokenize>
								) : (
									<br />
								)}
							</div>
					  ))
					: tokens.map((lineTokens, index) => (
							// Lines
							<div key={index}>
								{lineTokens.length > 0 ? (
									lineTokens.map((token, index) => (
										// Tokens
										<Tokenize key={index} color={token.color}>
											{token.content}
										</Tokenize>
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

export const MemoSyntaxHighlighting = React.memo(SyntaxHighlighting)
