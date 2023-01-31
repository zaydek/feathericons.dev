import * as feather from "../data/react-feather"

import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"
import { useContext, useState } from "react"
import { CodePenHex, CodePenIcon, NextJsHex, NextJsIcon, ReactJsHex, ReactJsIcon, SassHex, SassIcon, SvgHex, SvgIcon, TailwindCssHex, TailwindCssIcon, TwitterHex, TwitterIcon, TypeScriptHex, TypeScriptIcon } from "../components/icons"
import { MouseTooltip } from "../components/mouse-tooltip"
import { PageTransition } from "../components/page-transition"
import { A, Article, Code, H1, H2, Hr, InlineIcon, Li, Ol, P, Pre } from "../components/prose"
import { sizeInitial } from "../constants"
import { manifest } from "../data/react-feather-manifest"
import { toKebabCase, toTitleCase } from "../lib/cases"
import { cx } from "../lib/cx"
import { detab } from "../lib/format"
import { Icon, IconProps } from "../lib/react/icon"
import { SliderContext } from "../providers/state"

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
				name: toKebabCase(name),
			},
		})),
		fallback: false,
	}
}

export const getStaticProps: GetStaticProps<NameProps, NameParams> = context => {
	const params = context.params!
	const name = toTitleCase(params.name) as keyof typeof manifest
	return { props: { name } }
}

////////////////////////////////////////////////////////////////////////////////

function ResponsiveIcon({ className, ...props }: IconProps) {
	return <Icon className={cx(className, "[transform:_scale(var(--grid-icon-scale))] [stroke-width:_var(--grid-icon-stroke-width)]")} {...props} />
}

function Container({ children, ...props }: JSX.IntrinsicElements["div"]) {
	return (
		//// <div className="bg-gray h-256 overflow-clip rounded-24 bg-gray-50 shadow-[var(--shadow-2)]" data-background-dots {...props}>
		<div className="bg-gray h-256 overflow-clip rounded-24 border bg-gray-50" data-background-dots {...props}>
			{children}
		</div>
	)
}

////////////////////////////////////////////////////////////////////////////////

//// <Container>
//// 	<div className="flex h-100% flex-col items-center justify-center">
//// 		<div className="flex flex-col gap-12">
//// 			<div className="group/button flex h-48 cursor-pointer items-center rounded-1e3 bg-white pr-32 shadow-[var(--shadow-2)] hover:bg-gray-100 hover:active:bg-[var(--theme-color)] hover:active:shadow-[var(--inset-shadow-2)]">
//// 				{/* LHS */}
//// 				<div className="flex h-48 w-48 items-center justify-center">
//// 					<ResponsiveIcon className="h-20 w-20 text-gray-700 group-hover/button:group-active/button:text-white" icon={feather.Feather} />
//// 				</div>
//// 				{/* RHS */}
//// 				<div className="aspect-[16] h-6 rounded-1e3 bg-gray-300 group-hover/button:group-active/button:bg-white"></div>
//// 			</div>
//// 			<div className="group/button flex h-48 cursor-not-allowed items-center rounded-1e3 bg-gray-200 pr-32">
//// 				{/* LHS */}
//// 				<div className="flex h-48 w-48 items-center justify-center">
//// 					{/* Use gray-400 here because of bg-gray-200 */}
//// 					<ResponsiveIcon className="h-20 w-20 text-gray-400" icon={feather.LifeBuoy} />
//// 				</div>
//// 				{/* RHS */}
//// 				{/* Use gray-400 here because of bg-gray-200 */}
//// 				<div className="aspect-[16] h-6 rounded-1e3 bg-gray-400"></div>
//// 			</div>
//// 		</div>
//// 	</div>
//// </Container>

export default function Component({ name }: { name: keyof typeof manifest }) {
	const { size } = useContext(SliderContext)!

	const [eye, setEye] = useState(false)

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
					<Container>
						<div className="flex h-100% items-center justify-center">
							<div className="w-[calc(48px_*_5)] rounded-[calc(48px_*_0.375)] bg-white shadow-[var(--shadow-2)]">
								<div className="flex justify-between">
									{/* LHS */}
									<div className="flex items-center">
										<div className="flex h-48 w-48 items-center justify-center">
											<ResponsiveIcon className="h-20 w-20 text-gray-700" icon={feather.Feather} />
										</div>
										<div className="aspect-[20] h-6 rounded-1e3 bg-gray-300"></div>
									</div>
								</div>
								<hr />
								<div className="flex justify-between">
									{/* LHS */}
									<div className="flex items-center">
										<div className="flex h-48 w-48 items-center justify-center">
											<ResponsiveIcon className="h-20 w-20 text-gray-300" icon={feather.Lock} />
										</div>
										<div className="aspect-[12] h-6 rounded-1e3 bg-gray-300"></div>
									</div>
									{/* RHS */}
									{/* eslint-disable jsx-a11y/click-events-have-key-events */}
									{/* eslint-disable jsx-a11y/no-static-element-interactions */}
									<div className="flex h-48 w-48 cursor-pointer items-center justify-center">
										<div className="group/eye flex h-32 w-32 items-center justify-center rounded-1e3 hover:bg-gray-100 hover:active:bg-gray-200" onClick={e => setEye(curr => !curr)}>
											<ResponsiveIcon className="h-20 w-20 text-gray-300 group-hover/eye:text-gray-700" icon={eye ? feather.Eye : feather.EyeOff} />
										</div>
									</div>
								</div>
							</div>
						</div>
					</Container>

					{/* <Container>
						<div className="flex h-100% items-center justify-center gap-16" style={{ "--base": "16px", "--increment": 1 + 1 / 3 } as any}>
							<ResponsiveIcon className="rounded text-700 h-[calc(var(--base)_+_var(--base)_*_var(--increment)_*_0)] w-[calc(var(--base)_+_var(--base)_*_var(--increment)_*_0)]" icon={feather.Feather} />
							<ResponsiveIcon className="rounded text-700 h-[calc(var(--base)_+_var(--base)_*_var(--increment)_*_1)] w-[calc(var(--base)_+_var(--base)_*_var(--increment)_*_1)]" icon={feather.Feather} />
							<ResponsiveIcon className="rounded text-700 h-[calc(var(--base)_+_var(--base)_*_var(--increment)_*_2)] w-[calc(var(--base)_+_var(--base)_*_var(--increment)_*_2)]" icon={feather.Feather} />
							<ResponsiveIcon className="rounded text-700 h-[calc(var(--base)_+_var(--base)_*_var(--increment)_*_3)] w-[calc(var(--base)_+_var(--base)_*_var(--increment)_*_3)]" icon={feather.Feather} />
						</div>
					</Container> */}

					<Container>
						<div
							className="flex h-100% items-center justify-center"
							style={
								{
									"--step-1": "16px",
									"--step-2": "32px",
									"--step-3": "48px",
									"--step-4": "64px",
								} as any
							}
						>
							<MouseTooltip pos="center" content={`SIZE: ${(16 * size) / sizeInitial} PX`}>
								<div className="flex h-[var(--step-4)] w-[calc(var(--step-1)_+_24px)] cursor-pointer items-center justify-center" onClick={async e => await navigator.clipboard.writeText(`${(16 * size) / sizeInitial}px`)}>
									<ResponsiveIcon className="rounded text-700 h-[var(--step-1)] w-[var(--step-1)]" icon={feather.Feather} />
								</div>
							</MouseTooltip>
							<MouseTooltip pos="center" content={`SIZE: ${(32 * size) / sizeInitial} PX`}>
								<div className="flex h-[var(--step-4)] w-[calc(var(--step-2)_+_24px)] cursor-pointer items-center justify-center" onClick={async e => await navigator.clipboard.writeText(`${(32 * size) / sizeInitial}px`)}>
									<ResponsiveIcon className="rounded text-700 h-[var(--step-2)] w-[var(--step-2)]" icon={feather.Feather} />
								</div>
							</MouseTooltip>
							<MouseTooltip pos="center" content={`SIZE: ${(48 * size) / sizeInitial} PX`}>
								<div className="flex h-[var(--step-4)] w-[calc(var(--step-3)_+_24px)] cursor-pointer items-center justify-center" onClick={async e => await navigator.clipboard.writeText(`${(48 * size) / sizeInitial}px`)}>
									<ResponsiveIcon className="rounded text-700 h-[var(--step-3)] w-[var(--step-3)]" icon={feather.Feather} />
								</div>
							</MouseTooltip>
							<MouseTooltip pos="center" content={`SIZE: ${(64 * size) / sizeInitial} PX`}>
								<div className="flex h-[var(--step-4)] w-[calc(var(--step-4)_+_24px)] cursor-pointer items-center justify-center" onClick={async e => await navigator.clipboard.writeText(`${(64 * size) / sizeInitial}px`)}>
									<ResponsiveIcon className="rounded text-700 h-[var(--step-4)] w-[var(--step-4)]" icon={feather.Feather} />
								</div>
							</MouseTooltip>
						</div>
					</Container>

					<Container>
						<div className="flex h-100% flex-col">
							<div className="grow"></div>
							{/* Use z-index to prevent box-shadow from being clipped by sibling */}
							<div className="relative z-10 flex h-40 bg-gray-200 shadow-[var(--hairline-shadow-t)]">
								{/* Cap */}
								<div className="relative w-10">
									<div className="absolute bottom-0 right-0">
										<div className="h-10 w-10 bg-white"></div>
										<div className="absolute inset-0">
											<div className="h-10 w-10 rounded-br-10 bg-gray-200"></div>
										</div>
									</div>
								</div>
								<div className="flex flex-[1] items-center rounded-t-10 bg-white">
									<div className="flex h-40 w-40 items-center justify-center">
										<ResponsiveIcon className="h-20 w-20 text-gray-700" icon={feather.Feather} />
									</div>
									<div className="aspect-[12] h-6 rounded-1e3 bg-gray-300"></div>
								</div>
								{/* Cap */}
								<div className="relative flex-[1]">
									<div className="absolute bottom-0 left-0">
										<div className="h-40 w-40 bg-white"></div>
										<div className="absolute inset-0">
											<div className="h-40 w-40 rounded-bl-10 bg-gray-200"></div>
										</div>
									</div>
								</div>
							</div>
							{/* Use z-index to prevent box-shadow from being clipped by sibling */}
							<div className="relative z-10 flex h-48 gap-16 bg-white p-8 shadow-[var(--hairline-shadow-b)]">
								<div className="flex">
									<div className="group/a flex h-32 w-32 items-center justify-center rounded-1e3 hover:bg-gray-100 hover:active:bg-gray-200">
										<ResponsiveIcon className="h-20 w-20 rounded-1e3 text-gray-500" icon={feather.ArrowLeft} />
									</div>
									<div className="group/b flex h-32 w-32 items-center justify-center rounded-1e3">
										<ResponsiveIcon className="h-20 w-20 rounded-1e3 text-gray-300" icon={feather.ArrowRight} />
									</div>
									<div className="group/c flex h-32 w-32 items-center justify-center rounded-1e3 hover:bg-gray-100 hover:active:bg-gray-200">
										<ResponsiveIcon className="h-20 w-20 rounded-1e3 text-gray-500" icon={feather.RotateCw} />
									</div>
								</div>
								<div className="flex h-32 grow justify-between rounded-1e3 bg-gray-100 p-2">
									<div className="flex items-center gap-2">
										<div className="flex h-28 w-28 items-center justify-center rounded-1e3 hover:bg-gray-200 hover:active:bg-gray-300">
											<ResponsiveIcon className="text-300 h-16 w-16 text-gray-700" icon={feather.Info} />
										</div>
										<div className="aspect-[16] h-6 rounded-1e3 bg-gray-300"></div>
									</div>
									<div className="flex h-28 w-28 items-center justify-center rounded-1e3 hover:bg-gray-200 hover:active:bg-gray-300">
										<ResponsiveIcon className="text-300 h-16 w-16 text-gray-700" icon={feather.Star} />
									</div>
								</div>
							</div>
							<div className="grow bg-white"></div>
						</div>
					</Container>

					<Container>{/* ... */}</Container>
					<Container>{/* ... */}</Container>

					<Container>
						<div className="flex h-100% items-center justify-center">
							<div className="group/button flex h-48 cursor-pointer items-center rounded-1e3 bg-white pr-32 shadow-[var(--shadow-2)] hover:bg-gray-100 hover:active:bg-[var(--theme-color)] hover:active:shadow-[var(--inset-shadow-2)]">
								{/* LHS */}
								<div className="flex h-48 w-48 items-center justify-center">
									<ResponsiveIcon className="h-20 w-20 text-gray-700 group-hover/button:group-active/button:text-white" icon={feather.Feather} />
								</div>
								{/* RHS */}
								<div className="aspect-[16] h-6 rounded-1e3 bg-gray-300 group-hover/button:group-active/button:bg-white"></div>
							</div>
						</div>
					</Container>
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
