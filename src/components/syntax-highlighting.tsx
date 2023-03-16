import React from "react"

import * as shiki from "shiki-es"

import { getDarkMode, safeAnchorAttrs } from "@/lib"
import { ShikiContext } from "@/providers"

function TwitterUsername({ username, children }: { username: string; children: string }) {
	const href = `https://twitter.com/${username}`
	return (
		<a href={href} {...safeAnchorAttrs}>
			{children}
		</a>
	)
}

function Anchor({ href, children }: { href: string; children: string }) {
	return (
		<a href={href} {...safeAnchorAttrs}>
			{children}
		</a>
	)
}

// Negates http://www.w3.org/2000/svg
// Matches @… OR https://…
const re = /(.*)(?!http:\/\/www\.w3\.org\/2000\/svg)(@[^\s]+|https?:\/\/[^\s]+)(.*)/g

function Tokenize({ color, children }: { color?: string; children: string }) {
	const arr = [...children.matchAll(re)]
	if (arr.length === 0) {
		return <span style={{ color }}>{children}</span>
	} else {
		return (
			<span style={{ color }}>
				{arr.map(([_, $1, $2, $3], index) => (
					<React.Fragment key={index}>
						{$1}
						{children.startsWith("@") ? (
							<TwitterUsername username={$2.slice(1)}>{$2}</TwitterUsername>
						) : (
							<Anchor href={$2}>{$2}</Anchor>
						)}
						{$3}
					</React.Fragment>
				))}
			</span>
		)
	}
}

function SyntaxHighlighting({ lang, code }: { lang: string; code: string }) {
	const { highlighter } = React.useContext(ShikiContext)!
	const [tokens, setTokens] = React.useState<shiki.IThemedToken[][] | null>(null)

	React.useEffect(() => {
		if (highlighter === null) return
		const mode = getDarkMode() ? "github-dark" : "github-light"
		const tokens = highlighter.codeToThemedTokens(code, code.startsWith("//") ? "js" : lang, mode)
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
									<Tokenize
										// prettier-ignore
										color={getDarkMode()
											? "rgb(139, 148, 158)" // E.g. github-dark
											: "rgb(110, 119, 129)" // E.g. github-light
										}
									>
										{line}
									</Tokenize>
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
