import { PropsWithChildren } from "react"
import { Aside } from "./aside"
import { Header } from "./header"
import { Masks } from "./masks"
import { Nav } from "./nav"

function Sticky({ pos, children }: PropsWithChildren<{ pos: "tl" | "tr" }>) {
	return (
		<div className="sticky top-0 z-[var(--app-z)] 2xl:top-[var(--inset-y)]" data-pos={pos}>
			<div
				className="bg-white
					2xl:[[data-pos=tr]_&]:rounded-tr-[var(--app-rounding)]
					2xl:[[data-pos=tl]_&]:rounded-tl-[var(--app-rounding)]"
			>
				{children}
			</div>
		</div>
	)
}

export function Layout({ children }: PropsWithChildren) {
	return (
		<>
			<Header />
			<Masks />
			<div className="flex justify-center 2xl:pb-[calc(var(--inset-y)_*_2)]">
				<div className="flex w-100% max-w-[var(--app-w)] bg-white shadow-[var(--shadow-2)] 2xl:rounded-[var(--app-rounding)]">
					{/* LHS */}
					<main className="w-100% min-w-0">
						<Sticky pos="tl">
							<Nav />
						</Sticky>
						<div className="px-16 sm:px-32 2xl:px-64">{children}</div>
					</main>
					{/* RHS */}
					{/* Use box-content here because of border-l */}
					{/* TODO: Or use box-shadow here */}
					<aside className="box-content hidden min-w-[var(--aside-w)] max-w-[var(--aside-w)] border-l lg:block">
						<Sticky pos="tr">
							<Aside />
						</Sticky>
					</aside>
				</div>
			</div>
		</>
	)
}
