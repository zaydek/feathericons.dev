import * as p from "../components/star-prose"

import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"
import { A } from "../components/anchor"
import { Demo4, DemoButton, DemoChrome, DemoGoldenAspectRatio, DemoLogin, DemoSocialMedia, Recommended } from "../components/demos"
import { Icon, SVG } from "../components/icon"
import {
	CodePenIconWithColor,
	CodePenUrl,
	NextjsIconWithColor,
	NextjsUrl,
	ReactjsColor,
	ReactjsIcon,
	ReactjsIconWithColor,
	ReactjsUrl,
	SassIconWithColor,
	SvgIconWithColor,
	TailwindCssIconWithColor,
	TailwindCssUrl,
	TwitterIconWithColor,
	TwitterUrl,
	TypeScriptIconWithColor,
	TypeScriptUrl,
} from "../components/icon-config"
import { PageTransition } from "../components/page-transition"
import { manifest } from "../data/manifest"
import { ExternalLink } from "../data/react-feather"
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
		<p.Article>
			<PageTransition>
				<p.Heading>
					Icon: <p.Code>{convertToSpaceCase(name)}</p.Code>
				</p.Heading>
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
						<p.Heading>
							Recommended Icons for <p.Code>{convertToSpaceCase(name)}</p.Code>
						</p.Heading>
						<div className="flex flex-wrap">
							{manifest[name].more.map(name => (
								<Recommended key={name} name={name} />
							))}
						</div>
					</>
				)}
				<hr />
				<p.Heading>Get Started With Feather</p.Heading>
				<p>
					<LinkOut href="https://github.com/feathericons/feather">Feather</LinkOut> Feather is a collection of simply beautiful open source icons. Each icon is
					designed on a 24×24 grid with an emphasis on simplicity, consistency, and flexibility.
				</p>
				<p>
					Feather can easily be used in most environments. Use this website to quickly search and copy icon codes as <Svg />, <Reactjs />, or{" "}
					<TypeScript>TypeScript React.js</TypeScript>, or use one of the{" "}
					<LinkOut href="https://github.com/feathericons/feather#related-projects">related projects</LinkOut>.
				</p>
				<p.Subheading>Using {name} With a CDN</p.Subheading>
				<p>To get started with Feather using a CDN (content delivery network), simply:</p>
				<p.OrderedList>
					<p.ListItem>
						Add <p.Code>{`<script src="https://unpkg.com/feather-icons"></script>`}</p.Code> to the <p.Code>{`<head>`}</p.Code> tag
					</p.ListItem>
					<p.ListItem>
						Add <p.Code>{`<i data-feather="${convertToKebabCase(name).toLowerCase()}"></i>`}</p.Code>
					</p.ListItem>
					<p.ListItem>
						Invoke <p.Code>{`feather.replace()`}</p.Code>
					</p.ListItem>
				</p.OrderedList>
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
				<p.Subheading>
					Using {name} With{" "}
					<p.InlineIcon style={{ color: ReactjsColor }} icon={ReactjsIcon}>
						React
					</p.InlineIcon>
				</p.Subheading>
				<p>To get started with Feather using React, simply:</p>
				<p.OrderedList>
					<p.ListItem>
						Add <p.Code>{`npm i react-feather`}</p.Code> or <p.Code>{`yarn add react-feather`}</p.Code> or <p.Code>{`pnpm i react-feather`}</p.Code>
					</p.ListItem>
					<p.ListItem>
						Add <p.Code>{`import { ${name} } from "react-feather"`}</p.Code>
					</p.ListItem>
					<p.ListItem>
						Invoke <p.Code>{`<${name} />`}</p.Code>
					</p.ListItem>
				</p.OrderedList>
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
						Feather is licensed as <A href="https://github.com/feathericons/feather/blob/master/LICENSE">MIT open source</A>. Icons may be used for personal and
						commercial use without attribution.
						<br />
						Built using <TypeScript />, <Reactjs />, <Nextjs />, <TailwindCss />, and <Sass />.
						<br />
						<br />
						Looking for the original Feather website? <A href="https://feathericons.com">Click here.</A>
					</small>
				</p>
			</PageTransition>
		</p.Article>
	)
}

function LinkedIconText({ icon, children, ...props }: { icon: SVG } & JSX.IntrinsicElements["a"] & Required<Pick<JSX.IntrinsicElements["a"], "href">>) {
	return (
		<A className="inline-flex items-center" {...props}>
			<span className="underline decoration-gray-400">{children}</span>&nbsp;
			<Icon className="h-[1em] w-[1em] text-gray-700" icon={icon} />
		</A>
	)
}

const LinkOut = ({ children, ...props }: JSX.IntrinsicElements["a"] & Required<Pick<JSX.IntrinsicElements["a"], "href">>) => (
	<LinkedIconText icon={ExternalLink} {...props}>
		{children}
	</LinkedIconText>
)

const CodePen = ({ href, children, ...props }: JSX.IntrinsicElements["a"]) => (
	<LinkedIconText href={href ?? CodePenUrl} icon={CodePenIconWithColor} {...props}>
		{children ?? "CodePen"}
	</LinkedIconText>
)
const Nextjs = ({ href, children, ...props }: JSX.IntrinsicElements["a"]) => (
	<LinkedIconText href={href ?? NextjsUrl} icon={NextjsIconWithColor} {...props}>
		{children ?? "Next.js"}
	</LinkedIconText>
)
const Reactjs = ({ href, children, ...props }: JSX.IntrinsicElements["a"]) => (
	<LinkedIconText href={href ?? ReactjsUrl} icon={ReactjsIconWithColor} {...props}>
		{children ?? "React.js"}
	</LinkedIconText>
)
const Sass = ({ href, children, ...props }: JSX.IntrinsicElements["a"]) => (
	<LinkedIconText href={href ?? "TODO"} icon={SassIconWithColor} {...props}>
		{children ?? "Sass"}
	</LinkedIconText>
)
const Svg = ({ href, children, ...props }: JSX.IntrinsicElements["a"]) => (
	<LinkedIconText href={href ?? "TODO"} icon={SvgIconWithColor} {...props}>
		{children ?? "SVG"}
	</LinkedIconText>
)
const TailwindCss = ({ href, children, ...props }: JSX.IntrinsicElements["a"]) => (
	<LinkedIconText href={href ?? TailwindCssUrl} icon={TailwindCssIconWithColor} {...props}>
		{children ?? "Tailwind CSS"}
	</LinkedIconText>
)
const Twitter = ({ href, children, ...props }: JSX.IntrinsicElements["a"]) => (
	<LinkedIconText href={href ?? TwitterUrl} icon={TwitterIconWithColor} {...props}>
		{children ?? "Twitter"}
	</LinkedIconText>
)
const TypeScript = ({ href, children, ...props }: JSX.IntrinsicElements["a"]) => (
	<LinkedIconText href={href ?? TypeScriptUrl} icon={TypeScriptIconWithColor} {...props}>
		{children ?? "TypeScript"}
	</LinkedIconText>
)
