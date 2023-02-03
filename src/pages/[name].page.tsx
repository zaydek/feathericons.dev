import * as p from "../components/star-prose"
import * as feather from "../data/react-feather"

import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"
import {
	CodePenHex,
	CodePenIcon,
	NextJsHex,
	NextJsIcon,
	ReactJsHex,
	ReactJsIcon,
	SassHex,
	SassIcon,
	SvgHex,
	SvgIcon,
	TailwindCssHex,
	TailwindCssIcon,
	TwitterHex,
	TwitterIcon,
	TypeScriptHex,
	TypeScriptIcon,
} from "../components/icon-config"
import { PageTransition } from "../components/page-transition"
import { manifest } from "../data/manifest"
import { convertToKebabCase, convertToSpaceCase, convertToTitleCase } from "../lib/cases"
import { detab } from "../lib/format"
import { Demo4, DemoButton, DemoChrome, DemoGoldenAspectRatio, DemoLogin, DemoSocialMedia, Recommendation } from "./demos"

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
		<PageTransition>
			<p.Article>
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
				{manifest[name].more.length > 0 && (
					<>
						<p.Heading>
							Recommended Icons for <p.Code>{convertToSpaceCase(name)}</p.Code>
						</p.Heading>
						<div className="flex flex-wrap">
							{manifest[name].more.map(name => (
								<Recommendation key={name} name={name} />
							))}
						</div>
					</>
				)}
				<hr />
				<p.Heading>Get Started With Feather</p.Heading>
				<p>
					<p.Anchor href="https://github.com/feathericons/feather">
						<p.InlineIcon icon={feather.ExternalLink}>Feather</p.InlineIcon>
					</p.Anchor>{" "}
					is a collection of simply beautiful open source icons. Each icon is designed on a 24×24 grid with an emphasis on simplicity, consistency, and
					flexibility.
				</p>
				<p>
					Feather can easily be used in most environments. Use this website to quickly search and copy icon codes as{" "}
					<p.InlineIcon style={{ color: SvgHex }} icon={SvgIcon}>
						SVG
					</p.InlineIcon>
					,{" "}
					<p.InlineIcon style={{ color: ReactJsHex }} icon={ReactJsIcon}>
						React
					</p.InlineIcon>
					, or{" "}
					<p.InlineIcon style={{ color: TypeScriptHex }} icon={TypeScriptIcon}>
						TypeScript React
					</p.InlineIcon>
					, or use one of the{" "}
					<p.Anchor href="https://github.com/feathericons/feather#related-projects">
						<p.InlineIcon icon={feather.ExternalLink}>related projects</p.InlineIcon>
					</p.Anchor>
					.
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
					Click here to get started with a{" "}
					<p.Anchor href="https://codepen.io/pen?template=WOJZdM">
						<p.InlineIcon style={{ color: CodePenHex }} icon={CodePenIcon}>
							CodePen
						</p.InlineIcon>
					</p.Anchor>{" "}
					template.
				</p>
				<p.Subheading>
					Using {name} With{" "}
					<p.InlineIcon style={{ color: ReactJsHex }} icon={ReactJsIcon}>
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
					Click here to get started with a{" "}
					<p.Anchor href="https://play.tailwindcss.com/tq0UHdwbAr">
						<p.InlineIcon style={{ color: TailwindCssHex }} icon={TailwindCssIcon}>
							Tailwind CSS
						</p.InlineIcon>
					</p.Anchor>{" "}
					template.
				</p>
				<hr />
				<p>
					<small>
						Icons by{" "}
						<p.Anchor href="https://twitter.com/colebemis">
							<p.InlineIcon style={{ color: TwitterHex }} icon={TwitterIcon}>
								@colebemis
							</p.InlineIcon>
						</p.Anchor>
						. App by{" "}
						<p.Anchor href="https://twitter.com/username_ZAYDEK">
							<p.InlineIcon style={{ color: TwitterHex }} icon={TwitterIcon}>
								@username_ZAYDEK
							</p.InlineIcon>
						</p.Anchor>
						.
						<br />
						Feather is licensed as <p.Anchor href="https://github.com/feathericons/feather/blob/master/LICENSE">MIT open source</p.Anchor>. Icons may be used
						for personal and commercial use without attribution.
						<br />
						Built using{" "}
						<p.Anchor href="https://typescriptlang.org">
							<p.InlineIcon style={{ color: TypeScriptHex }} icon={TypeScriptIcon}>
								TypeScript
							</p.InlineIcon>
						</p.Anchor>
						,{" "}
						<p.Anchor href="https://reactjs.org">
							<p.InlineIcon style={{ color: ReactJsHex }} icon={ReactJsIcon}>
								React.js
							</p.InlineIcon>
						</p.Anchor>
						,{" "}
						<p.Anchor href="https://nextjs.org">
							<p.InlineIcon style={{ color: NextJsHex }} icon={NextJsIcon}>
								Next.js
							</p.InlineIcon>
						</p.Anchor>
						,{" "}
						<p.Anchor href="https://tailwindcss.com">
							<p.InlineIcon style={{ color: TailwindCssHex }} icon={TailwindCssIcon}>
								Tailwind CSS
							</p.InlineIcon>
						</p.Anchor>
						, and{" "}
						<p.Anchor href="https://sass-lang.com">
							<p.InlineIcon style={{ color: SassHex }} icon={SassIcon}>
								Sass
							</p.InlineIcon>
						</p.Anchor>
						.
						<br />
						<br />
						Looking for the original Feather website? <p.Anchor href="https://feathericons.com">Click here.</p.Anchor>
					</small>
				</p>
			</p.Article>
		</PageTransition>
	)
}
