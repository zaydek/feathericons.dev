import { PropsWithChildren } from "react"
import { iota } from "../lib/iota"
import { Aside } from "./_aside"
import { LayoutHeader } from "./_layout-header"
import { LayoutMasks } from "./_layout-masks"

function Sticky({ pos, children }: PropsWithChildren<{ pos: "tl" | "tr" }>) {
	return (
		<div className="sticky top-0 z-[var(--app-z)] 2xl:top-[var(--inset-y)]" data-pos={pos}>
			<div
				className="bg-[#fff]
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
			<LayoutHeader />
			<LayoutMasks />
			<div className="flex justify-center 2xl:pb-[calc(var(--inset-y)_*_2)]">
				<div className="flex w-100% max-w-[var(--app-w)] bg-[#fff] shadow-[var(--shadow-3)] 2xl:rounded-[var(--app-rounding)]">
					{/* LHS */}
					<main className="w-100% min-w-0">
						<Sticky pos="tl">
							{iota(4).map(index => (
								<div key={index}>Hello, world!</div>
							))}
						</Sticky>
						<div className="p-16 lg:p-32 2xl:p-64">{children}</div>
					</main>
					{/* RHS */}
					<aside className="hidden min-w-[var(--aside-w)] max-w-[var(--aside-w)] border-l lg:block">
						<Sticky pos="tr">
							<Aside />
						</Sticky>
					</aside>
				</div>
			</div>
		</>
	)
}