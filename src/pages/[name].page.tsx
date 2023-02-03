import * as p from "../components/star-prose"

import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"
import { Demo4, DemoButton, DemoChrome, DemoGoldenAspectRatio, DemoLogin, DemoSocialMedia, Recommended } from "../components/demos"
import {
	CodePenIcon,
	CodePenUrl,
	NextjsIcon,
	NextjsUrl,
	ReactjsIcon,
	ReactjsUrl,
	SassIcon,
	SvgIcon,
	TailwindCssIcon,
	TailwindCssUrl,
	TwitterIcon,
	TwitterUrl,
	TypeScriptIcon,
	TypeScriptUrl
} from "../components/icon-config"
import { PageTransition } from "../components/page-transition"
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

const CodePen = ({ href, children, ...props }: JSX.IntrinsicElements["a"]) => (
	<p.TextIconAnchor href={href ?? CodePenUrl} icon={CodePenIcon} {...props}>
		{children ?? "CodePen"}
	</p.TextIconAnchor>
)
const Nextjs = ({ href, children, ...props }: JSX.IntrinsicElements["a"]) => (
	<p.TextIconAnchor href={href ?? NextjsUrl} icon={NextjsIcon} {...props}>
		{children ?? "Next.js"}
	</p.TextIconAnchor>
)
const Reactjs = ({ href, children, ...props }: JSX.IntrinsicElements["a"]) => (
	<p.TextIconAnchor href={href ?? ReactjsUrl} icon={ReactjsIcon} {...props}>
		{children ?? "React.js"}
	</p.TextIconAnchor>
)
const Sass = ({ href, children, ...props }: JSX.IntrinsicElements["a"]) => (
	<p.TextIconAnchor href={href ?? "TODO"} icon={SassIcon} {...props}>
		{children ?? "Sass"}
	</p.TextIconAnchor>
)
const Svg = ({ href, children, ...props }: JSX.IntrinsicElements["a"]) => (
	<p.TextIconAnchor href={href ?? "TODO"} icon={SvgIcon} {...props}>
		{children ?? "SVG"}
	</p.TextIconAnchor>
)
const TailwindCss = ({ href, children, ...props }: JSX.IntrinsicElements["a"]) => (
	<p.TextIconAnchor href={href ?? TailwindCssUrl} icon={TailwindCssIcon} {...props}>
		{children ?? "Tailwind CSS"}
	</p.TextIconAnchor>
)
const Twitter = ({ href, children, ...props }: JSX.IntrinsicElements["a"]) => (
	<p.TextIconAnchor href={href ?? TwitterUrl} icon={TwitterIcon} {...props}>
		{children ?? "Twitter"}
	</p.TextIconAnchor>
)
const TypeScript = ({ href, children, ...props }: JSX.IntrinsicElements["a"]) => (
	<p.TextIconAnchor href={href ?? TypeScriptUrl} icon={TypeScriptIcon} {...props}>
		{children ?? "TypeScript"}
	</p.TextIconAnchor>
)

export default function Component({ name }: { name: keyof typeof manifest }) {
	return (
		<p.Article>
			<PageTransition>
				<p.H1>
					Icon: <p.Code>{convertToSpaceCase(name)}</p.Code>
				</p.H1>
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
						<p.H1>
							Recommended Icons for <p.Code>{convertToSpaceCase(name)}</p.Code>
						</p.H1>
						<div className="flex flex-wrap">
							{manifest[name].more.map(name => (
								<Recommended key={name} name={name} />
							))}
						</div>
					</>
				)}
				<hr />
				<p.H1>Get Started With Feather</p.H1>
				<p>
					<p.TextAnchor href="https://github.com/feathericons/feather">Feather</p.TextAnchor> Feather is a collection of simply beautiful open source icons.
					Each icon is designed on a 24×24 grid with an emphasis on simplicity, consistency, and flexibility.
				</p>
				<p>
					Feather can easily be used in most environments. Use this website to quickly search and copy icon codes as <Svg />, <Reactjs />, or{" "}
					<TypeScript>TypeScript React.js</TypeScript>, or use one of the{" "}
					<p.TextAnchor href="https://github.com/feathericons/feather#related-projects">related projects</p.TextAnchor>.
				</p>
				<p.H2>Using {name} With a CDN</p.H2>
				<p>To get started with Feather using a CDN (content delivery network), simply:</p>
				<p.Ol>
					<p.Li>
						Add <p.Code>{`<script src="https://unpkg.com/feather-icons"></script>`}</p.Code> to the <p.Code>{`<head>`}</p.Code> tag
					</p.Li>
					<p.Li>
						Add <p.Code>{`<i data-feather="${convertToKebabCase(name).toLowerCase()}"></i>`}</p.Code>
					</p.Li>
					<p.Li>
						Invoke <p.Code>{`feather.replace()`}</p.Code>
					</p.Li>
				</p.Ol>
				<p>For example:</p>
				<p.Pre lang="html">
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
				</p.Pre>
				<p>
					Click here to get started with a <CodePen href="https://codepen.io/pen?template=WOJZdM" /> template.
				</p>
				<p.H2>
					Using {name} With <Reactjs />
				</p.H2>
				<p>To get started with Feather using React, simply:</p>
				<p.Ol>
					<p.Li>
						Add <p.Code>{`npm i react-feather`}</p.Code> or <p.Code>{`yarn add react-feather`}</p.Code> or <p.Code>{`pnpm i react-feather`}</p.Code>
					</p.Li>
					<p.Li>
						Add <p.Code>{`import { ${name} } from "react-feather"`}</p.Code>
					</p.Li>
					<p.Li>
						Invoke <p.Code>{`<${name} />`}</p.Code>
					</p.Li>
				</p.Ol>
				<p>For example:</p>
				<p.Pre lang="tsx">
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
				</p.Pre>
				<p>
					Click here to get started with a <TailwindCss href="https://play.tailwindcss.com/tq0UHdwbAr" /> template.
				</p>
				<hr />
				<p>
					<small>
						Icons by <Twitter href="https://twitter.com/colebemis">@colebemis</Twitter>. App by{" "}
						<Twitter href="https://twitter.com/username_ZAYDEK">@username_ZAYDEK</Twitter>
						.
						<br />
						Feather is licensed as <p.TextAnchor href="https://github.com/feathericons/feather/blob/master/LICENSE">MIT open source</p.TextAnchor>. Icons may be
						used for personal and commercial use without attribution.
						<br />
						Built using <TypeScript />, <Reactjs />, <Nextjs />, <TailwindCss />, and <Sass />.
						<br />
						<br />
						Looking for the original Feather website? <p.TextAnchor href="https://feathericons.com">Click here</p.TextAnchor>.
					</small>
				</p>
			</PageTransition>
		</p.Article>
	)
}
