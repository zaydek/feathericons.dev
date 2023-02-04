import { PropsWithChildren } from "react"
import { Aside } from "./aside"
import { Header } from "./header"
import { Masks } from "./masks"
import { Nav } from "./nav"

function StickyTl({ children }: PropsWithChildren) {
	return <div className="sticky top-0 z-100 2xl:top-[var(--mask-inset)]">{children}</div>
}

function StickyTr({ children }: PropsWithChildren) {
	return <div className="sticky top-0 z-100 2xl:top-[var(--mask-inset)]">{children}</div>
}

export function Layout({ children }: PropsWithChildren) {
	return (
		<>
			<Header />
			<Masks />
			<div className="flex justify-center 2xl:pb-[calc(var(--mask-inset)_*_2)]">
				<div className="flex w-100% max-w-[var(--app-w)] bg-white shadow-[var(--shadow-2)] 2xl:rounded-[var(--app-rounding)]">
					{/* LHS */}
					<main className="w-100% min-w-0">
						<StickyTl>
							<div
								className="bg-[linear-gradient(to_bottom,_#fff_calc(32px_+_64px),_transparent)] py-32 px-64
									2xl:rounded-tl-[var(--app-rounding)]"
							>
								<Nav />
							</div>
						</StickyTl>
						<div className="px-16 pb-96 sm:px-32 2xl:px-64">{children}</div>
					</main>
					{/* RHS */}
					{/* Use box-content here because of border-l */}
					{/* TODO: Or use box-shadow here */}
					<aside className="box-content hidden min-w-[var(--aside-w)] max-w-[var(--aside-w)] border-l lg:block">
						<StickyTr>
							<div
								className="bg-white
									2xl:rounded-tr-[var(--app-rounding)]"
							>
								<Aside />
							</div>
						</StickyTr>
					</aside>
				</div>
			</div>
		</>
	)
}
