import * as prose from "../components/export-star-docs"

import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"
import { Demo4, DemoButton, DemoChrome, DemoGoldenAspectRatio, DemoLogin, DemoSocialMedia, Recommended } from "../components/docs-demos"
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
		<>
			<prose.H1>
				Icon: <prose.Code>{convertToSpaceCase(name)}</prose.Code>
			</prose.H1>
			<figure className="grid grid-cols-3 grid-rows-2 gap-24">
				<DemoLogin name={name} />
				<DemoGoldenAspectRatio name={name} />
				<DemoChrome name={name} />
				<Demo4 name={name} />
				<DemoSocialMedia name={name} />
				<DemoButton name={name} />
			</figure>
			{/* FIXME: Transition doesn't interpolate here -- why? */}
			{manifest[name].more.length > 0 && (
				<>
					<prose.H1>
						Recommended Icons for <prose.Code>{convertToSpaceCase(name)}</prose.Code>
					</prose.H1>
					<div className="flex flex-wrap">
						{manifest[name].more.map(name => (
							<Recommended key={name} name={name} />
						))}
					</div>
				</>
			)}
			<hr />
			<prose.H1>Get Started With Feather</prose.H1>
			<p>
				<prose.TextAnchor href="https://github.com/feathericons/feather">Feather</prose.TextAnchor> Feather is a collection of simply beautiful open source
				icons. Each icon is designed on a 24×24 grid with an emphasis on simplicity, consistency, and flexibility.
			</p>
			<p>
				Feather can easily be used in most environments. Use this website to quickly search and copy icon codes as <prose.Svg />, <prose.Reactjs />, or{" "}
				<prose.TypeScript>TypeScript React.js</prose.TypeScript>, or use one of the{" "}
				<prose.TextAnchor href="https://github.com/feathericons/feather#related-projects">related projects</prose.TextAnchor>.
			</p>
			<prose.H2>Using {name} With a CDN</prose.H2>
			<p>To get started with Feather using a CDN (content delivery network), simply:</p>
			<prose.Ol>
				<prose.Li>
					Add <prose.Code>{`<script src="https://unpkg.com/feather-icons"></script>`}</prose.Code> to the <prose.Code>{`<head>`}</prose.Code> tag
				</prose.Li>
				<prose.Li>
					Add <prose.Code>{`<i data-feather="${convertToKebabCase(name).toLowerCase()}"></i>`}</prose.Code>
				</prose.Li>
				<prose.Li>
					Invoke <prose.Code>{`feather.replace()`}</prose.Code>
				</prose.Li>
			</prose.Ol>
			<p>For example:</p>
			<prose.Pre lang="html">
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
			</prose.Pre>
			<p>
				Click here to get started with a <prose.CodePen href="https://codepen.io/pen?template=WOJZdM" /> template.
			</p>
			<prose.H2>
				Using {name} With <prose.Reactjs />
			</prose.H2>
			<p>To get started with Feather using React, simply:</p>
			<prose.Ol>
				<prose.Li>
					Add <prose.Code>{`npm i react-feather`}</prose.Code> or <prose.Code>{`yarn add react-feather`}</prose.Code> or{" "}
					<prose.Code>{`pnpm i react-feather`}</prose.Code>
				</prose.Li>
				<prose.Li>
					Add <prose.Code>{`import { ${name} } from "react-feather"`}</prose.Code>
				</prose.Li>
				<prose.Li>
					Invoke <prose.Code>{`<${name} />`}</prose.Code>
				</prose.Li>
			</prose.Ol>
			<p>For example:</p>
			<prose.Pre lang="tsx">
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
			</prose.Pre>
			<p>
				Click here to get started with a <prose.TailwindCss href="https://play.tailwindcss.com/tq0UHdwbAr" /> template.
			</p>
			<hr />
			<p>
				<small>
					Icons by <prose.Twitter href="https://twitter.com/colebemis">@colebemis</prose.Twitter>. App by{" "}
					<prose.Twitter href="https://twitter.com/username_ZAYDEK">@username_ZAYDEK</prose.Twitter>
					.
					<br />
					Feather is licensed as <prose.TextAnchor href="https://github.com/feathericons/feather/blob/master/LICENSE">MIT open source</prose.TextAnchor>. Icons
					may be used for personal and commercial use without attribution.
					<br />
					Built using <prose.TypeScript />, <prose.Reactjs />, <prose.Nextjs />, <prose.TailwindCss />, and <prose.Sass />.
					<br />
					<br />
					Looking for the original Feather website? <prose.TextAnchor href="https://feathericons.com">Click here</prose.TextAnchor>.
				</small>
			</p>
		</>
	)
}
