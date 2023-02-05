import * as feather from "../../data/react-feather"

import { useState } from "react"
import { manifest } from "../../data/manifest"
import { Svg } from "../dynamic-icon"
import { ResizableIcon } from "../resizable-icon"
import { Container } from "./shared"

function TabBar({ name }: { name: keyof typeof manifest }) {
	return (
		<div className="relative flex bg-gray-200 shadow-[var(--hairline-shadow-t)]">
			{/* LHS */}
			<div className="relative">
				<div className="w-[var(--rounding)]">
					<div className="absolute bottom-0 right-0">
						<div className="h-[var(--rounding)] w-[var(--rounding)] bg-white"></div>
						<div className="absolute inset-0">
							<div className="h-[var(--rounding)] w-[var(--rounding)] rounded-br-[var(--rounding)] bg-gray-200"></div>
						</div>
					</div>
				</div>
			</div>
			{/* Tab */}
			<div className="flex items-center rounded-t-[var(--rounding)] bg-white pr-32">
				{/* Use w-48 here to be consistent */}
				<div className="flex h-40 w-48 items-center justify-center">
					<ResizableIcon className="h-[var(--icon-size-1)] w-[var(--icon-size-1)] text-gray-700" icon={feather[name]} />
				</div>
				<div className="aspect-[16] h-6 rounded-1e3 bg-gray-300"></div>
			</div>
			{/* RHS */}
			<div className="relative">
				<div className="absolute bottom-0 left-0">
					<div className="h-40 w-40 bg-white"></div>
					<div className="absolute inset-0">
						<div className="h-40 w-40 rounded-bl-[var(--rounding)] bg-gray-200"></div>
					</div>
				</div>
			</div>
		</div>
	)
}

function NavBarButton({ icon, ...props }: { icon: Svg } & JSX.IntrinsicElements["button"] & { "aria-label": string }) {
	return (
		<button
			className="group/button flex h-[var(--hover-icon-size-2)] w-[var(--hover-icon-size-2)] items-center justify-center rounded-1e3
				hover:bg-gray-100
				hover:active:bg-gray-200"
			{...props}
		>
			<ResizableIcon className="h-[var(--icon-size-2)] rounded-1e3 text-gray-500" icon={icon} />
		</button>
	)
}

function NavBar() {
	const [bookmark, setBookmark] = useState(true)

	return (
		<div className="relative z-10 flex h-48 items-center gap-8 bg-white px-8 shadow-[var(--hairline-shadow-b)]">
			<div className="flex">
				<NavBarButton
					icon={feather.ArrowLeft}
					onClick={e => window.history.back()}
					// prettier-ignore
					aria-label="TODO"
				/>
				<NavBarButton
					icon={feather.ArrowRight}
					onClick={e => window.history.forward()}
					// prettier-ignore
					aria-label="TODO"
				/>
				<NavBarButton
					icon={feather.RotateCw}
					onClick={e => window.location.reload()}
					// prettier-ignore
					aria-label="TODO"
				/>
			</div>
			<div className="flex grow justify-between rounded-1e3 bg-gray-100">
				{/* LHS */}
				<div className="flex items-center">
					<div className="flex h-[var(--hover-icon-size-2)] w-[var(--hover-icon-size-2)] items-center justify-center rounded-1e3 hover:bg-gray-200 hover:active:bg-gray-300">
						<ResizableIcon className="text-300 h-[var(--icon-size-1)] w-[var(--icon-size-1)] text-gray-700" icon={feather.Info} />
					</div>
					<div className="aspect-[16] h-6 rounded-1e3 bg-gray-300"></div>
				</div>
				{/* RHS */}
				<button
					className="flex h-[var(--hover-icon-size-2)] w-[var(--hover-icon-size-2)] items-center justify-center rounded-1e3 hover:bg-gray-200 hover:active:bg-gray-300"
					onClick={e => setBookmark(curr => !curr)}
				>
					<ResizableIcon
						className="text-300 h-[var(--icon-size-1)] w-[var(--icon-size-1)] text-gray-700 [&[data-state-fill]]:fill-current"
						icon={feather.Star}
						data-state-fill={bookmark || undefined}
					/>
				</button>
			</div>
		</div>
	)
}

export function DemoChrome({ name }: { name: keyof typeof manifest }) {
	return (
		<Container
			style={
				// prettier-ignore
				{
					"--rounding":          "10px",
					"--icon-size-1":       "20px",
					"--icon-size-2":       "24px",
					"--hover-icon-size-2": "36px", // E.g. 1.5x (24px)
				} as any
			}
		>
			<div className="flex h-100% flex-col">
				<div className="grow"></div>
				<div>
					<TabBar name={name} />
					<NavBar />
				</div>
				<div className="grow bg-white"></div>
			</div>
		</Container>
	)
}
