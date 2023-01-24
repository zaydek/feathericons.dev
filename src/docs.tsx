import * as feather from "./data/react-feather"

import { manifest } from "./data/react-feather-manifest"
import { A, Code, H1, H2, Hr, Li, Ol, P, Pre, TextIcon } from "./docs-components"
import { NextJsColor, NextJsIcon, ReactJsColor, ReactJsIcon, SassColor, SassIcon, SvgColor, SvgIcon, TailwindCssColor, TailwindCssIcon, TwitterColor, TwitterIcon, TypeScriptColor, TypeScriptIcon } from "./icon-config-2"
import { detab } from "./lib/format"

export function Docs({ name }: { name: keyof typeof manifest }) {
	return (
		<div className="flex justify-center py-64">
			<article className="prose flex basis-1e3 flex-col gap-8">
				<H1>
					Getting Started With Feather&nbsp;
					<TextIcon className="text-[var(--trim-color)]" icon={feather.Feather} />
				</H1>
				<P>
					<A href="https://github.com/feathericons/feather">Feather</A> is a collection of simply beautiful open source icons. Each icon is designed on a 24×24 grid with an emphasis on simplicity, consistency, and flexibility.
				</P>
				<P>
					Feather can easily be used in most environments. Use this website to quickly search and copy icon codes as SVG&nbsp;
					<TextIcon style={{ color: SvgColor }} icon={SvgIcon} />, React.js&nbsp;
					<TextIcon style={{ color: ReactJsColor }} icon={ReactJsIcon} />, or TypeScript React.js&nbsp;
					<TextIcon style={{ color: TypeScriptColor }} icon={TypeScriptIcon} />, or use one of the <A href="https://github.com/feathericons/feather#related-projects">related projects</A>.
				</P>
				<Hr />
				<H2>
					Using {name} <TextIcon className="text-gray-700" icon={feather[name]} /> With a CDN
				</H2>
				<P>To get started with Feather using a CDN (content delivery network), simply:</P>
				<Ol>
					<Li>
						Add <Code>{`<script src="https://unpkg.com/feather-icons"></script>`}</Code> to <Code>{`<head>`}</Code>
					</Li>
					<Li>
						Add as many icons as desired using <Code>{`<i data-feather="{icon-name}"></i>`}</Code> syntax
					</Li>
					<Li>
						Call <Code>{`feather.replace()`}</Code>
					</Li>
				</Ol>
				<p>For example:</p>
				<Pre lang="html">
					{detab(`
						<!DOCTYPE html>
						<html lang='en'>
							<head>
								<script src='https://unpkg.com/feather-icons'></script>
							</head>
							<body>
								<i data-feather='smile'></i>
								<script>
									feather.replace();
								</script>
							</body>
						</html>
					`).replaceAll("\t", "  ")}
				</Pre>
				<Hr />
				<H2>
					Using {name} <TextIcon className="text-gray-700" icon={feather[name]} /> With React.js&nbsp;
					<TextIcon style={{ color: ReactJsColor }} icon={ReactJsIcon} />
				</H2>
				<P>To get started with Feather using React.js, simply:</P>
				<Ol>
					<Li>
						Run <Code>{`npm i react-feather`}</Code> or <Code>{`yarn add react-feather`}</Code> or <Code>{`pnpm i react-feather`}</Code>
					</Li>
					<Li>
						Import icons using <Code>{`import { IconName } from "react-feather"`}</Code> syntax
					</Li>
					<Li>
						Render icons using <Code>{`<IconName />`}</Code> syntax
					</Li>
				</Ol>
				<p>For example:</p>
				<Pre lang="sh">
					{detab(`
						npm i react-feather
						# Or yarn add react-feather
						# Or pnpm i react-feather
					`).replaceAll("\t", "  ")}
				</Pre>
				<Pre lang="tsx">
					{detab(`
						import { Smile } from 'react-feather';

						export default function App() {
							return (
								<div className='flex h-screen items-center justify-center'>
									<div className='flex h-10 items-center gap-2 rounded-2xl bg-sky-500 px-4'>
										<Smile className='h-4 w-4 text-white' />
										<div className='text-sm font-semibold tracking-wider text-white'>HELLO WORLD</div>
									</div>
								</div>
							);
						}
					`).replaceAll("\t", "  ")}
				</Pre>
				<Hr />
				<P>
					<small>
						Looking for the original Feather website? <A href="https://feathericons.com">Click here.</A>
						{/* &nbsp; */}
						{/* <TextIcon className="text-gray-500" icon={feather.ExternalLink} /> */}
					</small>
				</P>
				<Hr />
				<P>
					<small>
						Icons by <A href="https://twitter.com/colebemis">@colebemis</A>&nbsp;
						<TextIcon style={{ color: TwitterColor }} icon={TwitterIcon} /> and website by <A href="https://twitter.com/username_ZAYDEK">@username_ZAYDEK</A>&nbsp;
						<TextIcon style={{ color: TwitterColor }} icon={TwitterIcon} />
					</small>
					<br />
					<small>
						{/* Feather&nbsp; */}
						{/* <TextIcon className="text-gray-500" icon={feather.Feather} />  */}
						Feather is licensed as <A href="https://github.com/feathericons/feather/blob/master/LICENSE">MIT open source</A>. Icons may be used for personal and commercial use without attribution.
					</small>
					<br />
					<small>
						Built using{" "}
						<A href="https://reactjs.org">
							React.js&nbsp;
							<TextIcon style={{ color: ReactJsColor }} icon={ReactJsIcon} />
						</A>
						,{" "}
						<A href="https://nextjs.org">
							Next.js&nbsp;
							<TextIcon style={{ color: NextJsColor }} icon={NextJsIcon} />
						</A>
						,{" "}
						<A href="https://typescriptlang.org">
							TypeScript&nbsp;
							<TextIcon style={{ color: TypeScriptColor }} icon={TypeScriptIcon} />
						</A>
						,{" "}
						<A href="https://tailwindcss.com">
							Tailwind CSS&nbsp;
							<TextIcon style={{ color: TailwindCssColor }} icon={TailwindCssIcon} />
						</A>
						,{" "}
						<A href="https://sass-lang.com">
							and Sass&nbsp;
							<TextIcon style={{ color: SassColor }} icon={SassIcon} />
						</A>
					</small>
					<br />
				</P>
			</article>
		</div>
	)
}
