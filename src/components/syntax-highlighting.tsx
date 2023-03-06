import { Anchor } from "@/components"
import { ShikiContext } from "@/state"
import { Fragment, useContext, useEffect, useState } from "react"
import { IThemedToken } from "shiki-es"

function TwitterLink({ username, children }: { username: string; children: string }) {
	const href = `https://twitter.com/${username}`
	return <Anchor href={href}>{children}</Anchor>
}

function Link({ href, children }: { href: string; children: string }) {
	return <Anchor href={href}>{children}</Anchor>
}

// prettier-ignore
function RenderLink({ children }: { children: string }) {
	return children.startsWith("@")
		? <TwitterLink username={children.substring(1)}>{children}</TwitterLink>
		: <Link href={children}>{children}</Link>
}

const urlRegex = /(.*)(?!http:\/\/www\.w3\.org\/2000\/svg)(@[^\s]+|https?:\/\/[^\s]+)(.*)/g

function Tokenize({ color, children }: { color?: string; children: string }) {
	const arr = [...children.matchAll(urlRegex)]
	return (
		<span style={{ color }}>
			{arr.length > 0
				? arr.map(([_, $1, $2, $3], index) => (
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
		const tokens = highlighter.codeToThemedTokens(code, code.startsWith("//") ? "js" : lang, "github-light")
		setTokens(tokens)
	}, [code, highlighter, lang])

	return (
		<pre className="syntax-highlighting">
			<code className="syntax-highlighting-code">
				{tokens === null
					? // No syntax highlighting
					  // prettier-ignore
					  code.split("\n").map((line, index) => (
						<div key={index}>
							{line.length > 0 ? (
								<Tokenize>{line}</Tokenize>
							) : (
								<br />
							)}
						</div>
					))
					: // Syntax highlighting
					  // prettier-ignore
					  tokens.map((lineTokens, index) => (
						<div key={index}>
							{lineTokens.length > 0 ? (
								lineTokens.map((token, index) => (
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
