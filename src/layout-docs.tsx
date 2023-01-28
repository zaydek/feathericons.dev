import * as feather from "./data/react-feather"

import { manifest } from "./data/react-feather-manifest"
import { Anchor, Code, Hairline, Heading1, Heading2, ListItem, OrderedList, Paragraph, Pre, TextIcon } from "./docs-components"
import { CodePenHex, CodePenIcon, NextJsHex, NextJsIcon, ReactJsHex, ReactJsIcon, SassHex, SassIcon, SvgHex, SvgIcon, TailwindCssHex, TailwindCssIcon, TwitterHex, TwitterIcon, TypeScriptHex, TypeScriptIcon } from "./icon-config"
import { toKebabCase } from "./lib/cases"
import { detab } from "./lib/format"
import { RouteTransition } from "./route-transition"

export function Documentation({ name }: { name: keyof typeof manifest }) {
	return (
		//// <div className="flex justify-center">
		//// 	<div className="w-100% max-w-1024">
		<article className="prose space-y-8 text-gray-900">
			<RouteTransition>
				<Heading1>Get Started With Feather</Heading1>
				<Paragraph>
					<Anchor href="https://github.com/feathericons/feather">Feather</Anchor> is a collection of simply beautiful open source icons. Each icon is designed on a 24×24 grid with an emphasis on simplicity, consistency, and flexibility.
				</Paragraph>
				<Paragraph>
					Feather can easily be used in most environments. Use this website to quickly search and copy icon codes as{" "}
					<TextIcon style={{ color: SvgHex }} icon={SvgIcon}>
						SVG
					</TextIcon>
					,{" "}
					<TextIcon style={{ color: ReactJsHex }} icon={ReactJsIcon}>
						React
					</TextIcon>
					, or{" "}
					<TextIcon style={{ color: TypeScriptHex }} icon={TypeScriptIcon}>
						TypeScript React
					</TextIcon>
					, or use one of the <Anchor href="https://github.com/feathericons/feather#related-projects">related projects</Anchor>.
				</Paragraph>
				<Hairline />
				<Heading2>
					Using <TextIcon icon={feather[name]}>{name}</TextIcon> With a CDN
				</Heading2>
				<Paragraph>To get started with Feather using a CDN (content delivery network), simply:</Paragraph>
				<OrderedList>
					<ListItem>
						Add <Code lang="html">{`<script src="https://unpkg.com/feather-icons"></script>`}</Code> to the <Code lang="html">{`<head>`}</Code> tag
					</ListItem>
					<ListItem>
						Add <Code lang="html">{`<i data-feather="${toKebabCase(name)}"></i>`}</Code>
					</ListItem>
					<ListItem>
						Invoke <Code lang="js">{`feather.replace()`}</Code>
					</ListItem>
				</OrderedList>
				<Paragraph>For example:</Paragraph>
				<Pre lang="html">
					{detab(`
						<!DOCTYPE html>
						<html lang="en">
							<head>
								<script src="https://unpkg.com/feather-icons"></script>
							</head>
							<body>
								<i data-feather="${toKebabCase(name)}"></i>
								<script>
									feather.replace()
								</script>
							</body>
						</html>
					`)}
				</Pre>
				<Paragraph>
					Click here to get started with a{" "}
					<Anchor href="https://codepen.io/pen?template=WOJZdM">
						<TextIcon style={{ color: CodePenHex }} icon={CodePenIcon}>
							CodePen
						</TextIcon>
					</Anchor>{" "}
					template.
				</Paragraph>
				<Hairline />
				<Heading2>
					Using <TextIcon icon={feather[name]}>{name}</TextIcon> With{" "}
					<TextIcon style={{ color: ReactJsHex }} icon={ReactJsIcon}>
						React
					</TextIcon>
				</Heading2>
				<Paragraph>To get started with Feather using React, simply:</Paragraph>
				<OrderedList>
					<ListItem>
						Add <Code lang="sh">{`npm i react-feather`}</Code> or <Code lang="sh">{`yarn add react-feather`}</Code> or <Code lang="sh">{`pnpm i react-feather`}</Code>
					</ListItem>
					<ListItem>
						Add <Code lang="tsx">{`import { ${name} } from "react-feather"`}</Code>
					</ListItem>
					<ListItem>
						Invoke <Code lang="tsx">{`<${name} />`}</Code>
					</ListItem>
				</OrderedList>
				<Paragraph>For example:</Paragraph>
				<Pre lang="tsx">
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
				</Pre>
				<Paragraph>
					Click here to get started with a{" "}
					<Anchor href="https://play.tailwindcss.com/jPEYvRowr3">
						<TextIcon style={{ color: TailwindCssHex }} icon={TailwindCssIcon}>
							Tailwind CSS
						</TextIcon>
					</Anchor>{" "}
					template.
				</Paragraph>
				<Hairline />
				<Paragraph>
					<small>
						Icons by{" "}
						<Anchor href="https://twitter.com/colebemis">
							<TextIcon style={{ color: TwitterHex }} icon={TwitterIcon}>
								@colebemis
							</TextIcon>
						</Anchor>
						. App by{" "}
						<Anchor href="https://twitter.com/username_ZAYDEK">
							<TextIcon style={{ color: TwitterHex }} icon={TwitterIcon}>
								@username_ZAYDEK
							</TextIcon>
						</Anchor>
						.
						<br />
						Feather is licensed as <Anchor href="https://github.com/feathericons/feather/blob/master/LICENSE">MIT open source</Anchor>. Icons may be used for personal and commercial use without attribution.
						<br />
						Built using{" "}
						<Anchor href="https://typescriptlang.org">
							<TextIcon style={{ color: TypeScriptHex }} icon={TypeScriptIcon}>
								TypeScript
							</TextIcon>
						</Anchor>
						,{" "}
						<Anchor href="https://reactjs.org">
							<TextIcon style={{ color: ReactJsHex }} icon={ReactJsIcon}>
								React.js
							</TextIcon>
						</Anchor>
						,{" "}
						<Anchor href="https://nextjs.org">
							<TextIcon style={{ color: NextJsHex }} icon={NextJsIcon}>
								Next.js
							</TextIcon>
						</Anchor>
						,{" "}
						<Anchor href="https://tailwindcss.com">
							<TextIcon style={{ color: TailwindCssHex }} icon={TailwindCssIcon}>
								Tailwind CSS
							</TextIcon>
						</Anchor>
						, and{" "}
						<Anchor href="https://sass-lang.com">
							<TextIcon style={{ color: SassHex }} icon={SassIcon}>
								Sass
							</TextIcon>
						</Anchor>
						.
						<br />
						<br />
						Looking for the original Feather website? <Anchor href="https://feathericons.com">Click here.</Anchor>
					</small>
				</Paragraph>
			</RouteTransition>
		</article>
		//// 	</div>
		//// </div>
	)
}
