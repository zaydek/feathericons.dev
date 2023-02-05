import * as docs from "../components/docs"

import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"
import { DemoChrome } from "../components/demos/demo-chrome"
import { DemoGoldenAspectRatio } from "../components/demos/demo-golden-aspect-ratio"
import { DemoLogin } from "../components/demos/demo-login"
import { DemoSocialMedia } from "../components/demos/demo-social-media"
import { DemoTwitter } from "../components/demos/demo-twitter"
import { Recommended } from "../components/demos/recommended"
import { manifest } from "../data/manifest"
import { convertToKebabCase, convertToSpaceCase, convertToTitleCase } from "../lib/cases"
import { detab } from "../lib/format"

interface NameParams extends ParsedUrlQuery {
	name: string
}

export type NameProps = {
	name: keyof typeof manifest
}

export const getStaticPaths: GetStaticPaths<NameParams> = async () => {
	return {
		paths: Object.keys(manifest).map(name => ({
			params: {
				name: convertToKebabCase(name).toLowerCase(),
			},
		})),
		fallback: false,
	}
}

export const getStaticProps: GetStaticProps<NameProps, NameParams> = context => {
	const params = context.params!
	const name = convertToTitleCase(params.name) as keyof typeof manifest
	return { props: { name } }
}

////////////////////////////////////////////////////////////////////////////////

export default function Component({ name }: { name: keyof typeof manifest }) {
	return (
		<article className="pb-64">
			<docs.Heading>
				Ideas Using the <docs.Code>{convertToSpaceCase(name)}</docs.Code> Icon
			</docs.Heading>
			<figure className="grid grid-cols-3 grid-rows-2 gap-24">
				<DemoLogin name={name} />
				<DemoGoldenAspectRatio name={name} />
				<DemoChrome name={name} />
				<DemoSocialMedia name={name} />
				<DemoTwitter name={name} />
			</figure>
			{manifest[name].more.length > 0 && (
				<>
					<docs.Subheading>
						Recommended for Use With <docs.Code>{convertToSpaceCase(name)}</docs.Code>
					</docs.Subheading>
					<figure className="flex flex-wrap">
						{manifest[name].more.map(name => (
							<Recommended key={name} name={name} />
						))}
					</figure>
				</>
			)}
			{/* <hr /> */}
			<docs.Subheading>Get Started With Feather</docs.Subheading>
			<p>
				<docs.TextAnchor href="https://github.com/feathericons/feather">Feather</docs.TextAnchor> Feather is a collection of simply beautiful open source icons.
				Each icon is designed on a 24×24 grid with an emphasis on simplicity, consistency, and flexibility.
			</p>
			<p>
				Feather can easily be used in most environments. Use this website to quickly search and copy icon codes as <docs.Svg />, <docs.Reactjs />, or{" "}
				<docs.TypeScript>TypeScript React.js</docs.TypeScript>, or use one of the{" "}
				<docs.TextAnchor href="https://github.com/feathericons/feather#related-projects">related projects</docs.TextAnchor>.
			</p>
			{/* <hr /> */}
			<docs.Subheading>
				Using <docs.Code>{convertToSpaceCase(name)}</docs.Code> With a CDN
			</docs.Subheading>
			<p>To get started with Feather using a CDN (content delivery network), simply:</p>
			<docs.Ordered>
				<docs.Item>
					Add <docs.Code>{`<script src="https://unpkg.com/feather-icons"></script>`}</docs.Code> to the <docs.Code>{`<head>`}</docs.Code> tag
				</docs.Item>
				<docs.Item>
					Add <docs.Code>{`<i data-feather="${convertToKebabCase(name).toLowerCase()}"></i>`}</docs.Code>
				</docs.Item>
				<docs.Item>
					Invoke <docs.Code>{`feather.replace()`}</docs.Code>
				</docs.Item>
			</docs.Ordered>
			<p>For example:</p>
			<docs.CodeSnippet lang="html">
				{detab(`
					<!DOCTYPE html>
					<html lang="en">
						<head>
							<script src="https://unpkg.com/feather-icons"></script>
						</head>
						<body>
							<i data-feather="${convertToKebabCase(name).toLowerCase()}"></i>
							<script>
								feather.replace()
							</script>
						</body>
					</html>
				`)}
			</docs.CodeSnippet>
			<p>
				Click here to get started with a <docs.CodePen href="https://codepen.io/pen?template=WOJZdM" /> template.
			</p>
			{/* <hr /> */}
			<docs.Subheading>
				Using <docs.Code>{convertToSpaceCase(name)}</docs.Code> With <docs.Reactjs />
			</docs.Subheading>
			<p>To get started with Feather using React, simply:</p>
			<docs.Ordered>
				<docs.Item>
					Add <docs.Code>{`npm i react-feather`}</docs.Code> or <docs.Code>{`yarn add react-feather`}</docs.Code> or{" "}
					<docs.Code>{`pnpm i react-feather`}</docs.Code>
				</docs.Item>
				<docs.Item>
					Add <docs.Code>{`import { ${name} } from "react-feather"`}</docs.Code>
				</docs.Item>
				<docs.Item>
					Invoke <docs.Code>{`<${name} />`}</docs.Code>
				</docs.Item>
			</docs.Ordered>
			<p>For example:</p>
			<docs.CodeSnippet lang="tsx">
				{detab(`
					import { ${name} } from "react-feather"

					export default function App() {
						return (
							<div className="flex h-screen items-center justify-center">
								<div className="flex h-10 items-center gap-2 rounded-full bg-sky-500 px-4">
									<${name} classNameName="h-5 w-5 text-white" />
									<div className="text-[12px] font-[700] tracking-wider text-white">HELLO WORLD</div>
								</div>
							</div>
						)
					}
				`)}
			</docs.CodeSnippet>
			<p>
				Click here to get started with a <docs.TailwindCss href="https://play.tailwindcss.com/tq0UHdwbAr" /> template.
			</p>
			<hr />
			<p>
				<small>
					Icons by <docs.Twitter href="https://twitter.com/colebemis">@colebemis</docs.Twitter>. App by{" "}
					<docs.Twitter href="https://twitter.com/username_ZAYDEK">@username_ZAYDEK</docs.Twitter>.
					<br />
					Feather is licensed as <docs.TextAnchor href="https://github.com/feathericons/feather/blob/master/LICENSE">MIT open source</docs.TextAnchor>. Icons
					may be used for personal and commercial use without attribution.
					<br />
					Built using <docs.TypeScript />, <docs.Reactjs />, <docs.Nextjs />, <docs.TailwindCss />, and <docs.Sass />.
					<br />
					<br />
					Looking for the original Feather website? <docs.TextAnchor href="https://feathericons.com">Click here</docs.TextAnchor>.
				</small>
			</p>
			{/* <hr /> */}
		</article>
	)
}
