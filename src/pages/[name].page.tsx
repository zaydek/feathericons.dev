import * as feather from "../data/react-feather"

import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"
import { CodePenHex, CodePenIcon, NextJsHex, NextJsIcon, ReactJsHex, ReactJsIcon, SassHex, SassIcon, SvgHex, SvgIcon, TailwindCssHex, TailwindCssIcon, TwitterHex, TwitterIcon, TypeScriptHex, TypeScriptIcon } from "../components/icons"
import { PageTransition } from "../components/page-transition"
import { A, Article, Code, H1, H2, Hr, InlineIcon, Li, Ol, P, Pre } from "../components/prose"
import { manifest } from "../data/react-feather-manifest"
import { toKebabCase, toTitleCase } from "../lib/cases"
import { detab } from "../lib/format"
import { Icon } from "../lib/react/icon"

interface IconParams extends ParsedUrlQuery {
	name: string
}

export type IconProps = {
	name: keyof typeof manifest
}

export const getStaticPaths: GetStaticPaths<IconParams> = async () => {
	return {
		paths: Object.keys(manifest).map(name => ({
			params: {
				name: toKebabCase(name),
			},
		})),
		fallback: false,
	}
}

export const getStaticProps: GetStaticProps<IconProps, IconParams> = context => {
	const params = context.params!
	const name = toTitleCase(params.name) as keyof typeof manifest
	return { props: { name } }
}

export default function Component({ name }: { name: keyof typeof manifest }) {
	return (
		<PageTransition>
			<Article>
				<H1>Get Started With Feather</H1>
				<P>
					<A href="https://github.com/feathericons/feather">Feather</A> is a collection of simply beautiful open source icons. Each icon is designed on a 24×24 grid with an emphasis on simplicity, consistency, and flexibility.
				</P>
				<P>
					Feather can easily be used in most environments. Use this website to quickly search and copy icon codes as{" "}
					<InlineIcon style={{ color: SvgHex }} icon={SvgIcon}>
						SVG
					</InlineIcon>
					,{" "}
					<InlineIcon style={{ color: ReactJsHex }} icon={ReactJsIcon}>
						React
					</InlineIcon>
					, or{" "}
					<InlineIcon style={{ color: TypeScriptHex }} icon={TypeScriptIcon}>
						TypeScript React
					</InlineIcon>
					, or use one of the <A href="https://github.com/feathericons/feather#related-projects">related projects</A>.
				</P>

				<figure className="grid grid-cols-3 grid-rows-2 gap-24">
					<div className="bg-gray h-256 rounded-24 bg-gray-100">
						<div className="flex h-100% items-center justify-center">
							<div className="w-256 rounded-16 bg-white shadow-[var(--shadow-2)]">
								<div className="flex items-center">
									<div className="flex h-48 w-48 items-center justify-center">
										<Icon className="h-20 w-20 text-gray-700" icon={feather.Feather} />
									</div>
									<div className="aspect-[20] h-6 rounded-1e3 bg-gray-300"></div>
								</div>
								<hr />
								<div className="flex items-center">
									{/* LHS */}
									<div className="flex h-48 w-48 items-center justify-center">
										<Icon className="h-20 w-20 text-gray-300" icon={feather.Lock} />
									</div>
									{/* RHS */}
									{/* <div className="flex grow gap-6">
										<div className="h-6 w-6 rounded-1e3 bg-gray-700"></div>
										<div className="h-6 w-6 rounded-1e3 bg-gray-700"></div>
										<div className="h-6 w-6 rounded-1e3 bg-gray-700"></div>
										<div className="h-6 w-6 rounded-1e3 bg-gray-700"></div>
										<div className="h-6 w-6 rounded-1e3 bg-gray-700"></div>
										<div className="h-6 w-6 rounded-1e3 bg-gray-700"></div>
										<div className="h-6 w-6 rounded-1e3 bg-gray-700"></div>
										<div className="h-6 w-6 rounded-1e3 bg-gray-700"></div>
									</div> */}
									<div className="grow">
										<div className="aspect-[12] h-6 rounded-1e3 bg-gray-300"></div>
									</div>
									<div className="group/password flex h-48 w-48 items-center justify-center">
										<div className="flex h-32 w-32 items-center justify-center rounded-1e3 group-hover/password:bg-gray-100">
											<Icon className="h-20 w-20 text-gray-300" icon={feather.EyeOff} />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="bg-gray h-256 rounded-24 bg-gray-100"></div>
					<div className="bg-gray h-256 rounded-24 bg-gray-100"></div>
					<div className="bg-gray h-256 rounded-24 bg-gray-100"></div>
					<div className="bg-gray h-256 rounded-24 bg-gray-100"></div>

					<div className="bg-gray h-256 rounded-24 bg-gray-100">
						<div className="flex h-100% flex-col items-center justify-center gap-12">
							<div className="group/button flex h-48 cursor-pointer items-center rounded-1e3 bg-[#fff] pr-24 shadow-[var(--shadow-2)] hover:bg-gray-100 hover:active:bg-[var(--theme-color)] hover:active:shadow-[var(--inset-shadow-2)]">
								<div className="flex h-48 w-48 items-center justify-center">
									<Icon className="h-20 w-20 text-gray-700 group-hover/button:group-active/button:text-[#fff]" icon={feather.Feather} />
								</div>
								<div className="aspect-[16] h-6 rounded-1e3 bg-gray-300 group-hover/button:group-active/button:bg-[#fff]"></div>
							</div>
							<div className="flex h-48 cursor-not-allowed items-center rounded-1e3 bg-gray-200 pr-24">
								<div className="flex h-48 w-48 items-center justify-center">
									{/* Use gray-400 here because of bg-gray-200 */}
									<Icon className="h-20 w-20 text-gray-400" icon={feather.Feather} />
								</div>
								{/* Use gray-400 here because of bg-gray-200 */}
								<div className="aspect-[16] h-6 rounded-1e3 bg-gray-400"></div>
							</div>
						</div>
					</div>
				</figure>

				{/* <Hr /> */}

				<H2>Using {name} With a CDN</H2>
				<P>To get started with Feather using a CDN (content delivery network), simply:</P>
				<Ol>
					<Li>
						Add <Code>{`<script src="https://unpkg.com/feather-icons"></script>`}</Code> to the <Code>{`<head>`}</Code> tag
					</Li>
					<Li>
						Add <Code>{`<i data-feather="${toKebabCase(name)}"></i>`}</Code>
					</Li>
					<Li>
						Invoke <Code>{`feather.replace()`}</Code>
					</Li>
				</Ol>
				<P>For example:</P>
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
				<P>
					Click here to get started with a{" "}
					<A href="https://codepen.io/pen?template=WOJZdM">
						<InlineIcon style={{ color: CodePenHex }} icon={CodePenIcon}>
							CodePen
						</InlineIcon>
					</A>{" "}
					template.
				</P>
				<Hr />
				<H2>
					Using {name} With{" "}
					<InlineIcon style={{ color: ReactJsHex }} icon={ReactJsIcon}>
						React
					</InlineIcon>
				</H2>
				<P>To get started with Feather using React, simply:</P>
				<Ol>
					<Li>
						Add <Code>{`npm i react-feather`}</Code> or <Code>{`yarn add react-feather`}</Code> or <Code>{`pnpm i react-feather`}</Code>
					</Li>
					<Li>
						Add <Code>{`import { ${name} } from "react-feather"`}</Code>
					</Li>
					<Li>
						Invoke <Code>{`<${name} />`}</Code>
					</Li>
				</Ol>
				<P>For example:</P>
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
				<P>
					Click here to get started with a{" "}
					<A href="https://play.tailwindcss.com/jPEYvRowr3">
						<InlineIcon style={{ color: TailwindCssHex }} icon={TailwindCssIcon}>
							Tailwind CSS
						</InlineIcon>
					</A>{" "}
					template.
				</P>
				<Hr />
				<P>
					<small>
						Icons by{" "}
						<A href="https://twitter.com/colebemis">
							<InlineIcon style={{ color: TwitterHex }} icon={TwitterIcon}>
								@colebemis
							</InlineIcon>
						</A>
						. App by{" "}
						<A href="https://twitter.com/username_ZAYDEK">
							<InlineIcon style={{ color: TwitterHex }} icon={TwitterIcon}>
								@username_ZAYDEK
							</InlineIcon>
						</A>
						.
						<br />
						Feather is licensed as <A href="https://github.com/feathericons/feather/blob/master/LICENSE">MIT open source</A>. Icons may be used for personal and commercial use without attribution.
						<br />
						Built using{" "}
						<A href="https://typescriptlang.org">
							<InlineIcon style={{ color: TypeScriptHex }} icon={TypeScriptIcon}>
								TypeScript
							</InlineIcon>
						</A>
						,{" "}
						<A href="https://reactjs.org">
							<InlineIcon style={{ color: ReactJsHex }} icon={ReactJsIcon}>
								React.js
							</InlineIcon>
						</A>
						,{" "}
						<A href="https://nextjs.org">
							<InlineIcon style={{ color: NextJsHex }} icon={NextJsIcon}>
								Next.js
							</InlineIcon>
						</A>
						,{" "}
						<A href="https://tailwindcss.com">
							<InlineIcon style={{ color: TailwindCssHex }} icon={TailwindCssIcon}>
								Tailwind CSS
							</InlineIcon>
						</A>
						, and{" "}
						<A href="https://sass-lang.com">
							<InlineIcon style={{ color: SassHex }} icon={SassIcon}>
								Sass
							</InlineIcon>
						</A>
						.
						<br />
						<br />
						Looking for the original Feather website? <A href="https://feathericons.com">Click here.</A>
					</small>
				</P>
			</Article>
		</PageTransition>
	)
}
