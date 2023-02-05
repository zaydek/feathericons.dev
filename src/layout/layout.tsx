import * as typography from "../components/export-star-typography"
import * as feather from "../data/react-feather"

import { PropsWithChildren } from "react"
import { Anchor, AnchorProps } from "../components/anchor"
import { Icon, SVG } from "../components/icon"
import { Aside } from "./aside"
import { Header } from "./header"
import { Masks } from "./masks"
import { Nav } from "./nav"

function ExtLink({ icon, children, ...props }: { icon: SVG } & AnchorProps) {
	return (
		<Anchor className="flex h-32 items-center rounded-1e3 bg-black/25 pr-16" {...props}>
			<div className="flex h-32 w-32 items-center justify-center">
				<Icon className="h-16 w-16 fill-current text-white" icon={icon} />
			</div>
			<typography.Caps className="text-white">{children}</typography.Caps>
		</Anchor>
	)
}

function ExtLinks() {
	return (
		<>
			<div className="absolute top-16 left-16">
				<ExtLink href="https://github.com/feathericons/feather" icon={feather.Star}>
					STAR ON GITHUB
				</ExtLink>
			</div>
			<div className="absolute top-16 right-16">
				<ExtLink href="TODO" icon={feather.Twitter}>
					SHARE ON TWITTER
				</ExtLink>
			</div>
		</>
	)
}

export function Layout({ children }: PropsWithChildren) {
	return (
		<>
			<Header />
			<ExtLinks />
			<Masks />
			<div className="flex justify-center 2xl:pb-[calc(var(--mask-inset)_*_2)]">
				<div className="flex w-100% max-w-[var(--app-w)] bg-white shadow-[var(--shadow-2)] 2xl:rounded-[var(--app-rounding)]">
					{/* LHS */}
					<main className="w-100% min-w-0">
						<div className="sticky top-0 z-100 2xl:top-[var(--mask-inset)]">
							<div className="bg-[linear-gradient(to_bottom,_#fff_calc(32px_+_64px),_transparent)] py-32 px-64 2xl:rounded-tl-[var(--app-rounding)]">
								<Nav />
							</div>
						</div>
						{/* Hmm... */}
						{/* Defer to docs.scss for y-axis spacing */}
						<typography.docs.Article
							className="docs pb-96
								    [&_>_:not(pre)]:px-16
								 sm:[&_>_:not(pre)]:px-32
								2xl:[&_>_:not(pre)]:px-64"
						>
							{children}
						</typography.docs.Article>
					</main>
					{/* RHS */}
					{/* Use box-content here because of border-l */}
					<aside className="box-content hidden min-w-[var(--aside-w)] max-w-[var(--aside-w)] border-l lg:block">
						<div className="sticky top-0 z-100 2xl:top-[var(--mask-inset)]">
							<div className="bg-white 2xl:rounded-tr-[var(--app-rounding)]">
								<Aside />
							</div>
						</div>
					</aside>
				</div>
			</div>
		</>
	)
}
