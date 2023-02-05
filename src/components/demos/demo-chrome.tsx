import * as feather from "../../data/react-feather"

import { useState } from "react"
import { Accessible } from "../../aria/a11y"
import { manifest } from "../../data/manifest"
import { Icon } from "../dynamic-icon"
import { ResizableIcon } from "../resizable-icon"
import { Container } from "./shared"

function TabBarCapL() {
	return (
		<div className="relative">
			<div className="w-[var(--tab-bar-rounding)]"></div>
			<div className="absolute bottom-0 right-0">
				<div className="h-[var(--tab-bar-rounding)] w-[var(--tab-bar-rounding)] bg-white"></div>
				<div className="absolute inset-0">
					<div className="h-[var(--tab-bar-rounding)] w-[var(--tab-bar-rounding)] rounded-br-[var(--tab-bar-rounding)] bg-gray-200"></div>
				</div>
			</div>
		</div>
	)
}

function TabBarCapR() {
	return (
		<div className="relative">
			<div className="w-[var(--tab-bar-rounding)]"></div>
			<div className="absolute bottom-0 left-0">
				<div className="h-[var(--tab-bar-rounding)] w-[var(--tab-bar-rounding)] bg-white"></div>
				<div className="absolute inset-0">
					<div className="h-[var(--tab-bar-rounding)] w-[var(--tab-bar-rounding)] rounded-bl-[var(--tab-bar-rounding)] bg-gray-200"></div>
				</div>
			</div>
		</div>
	)
}

function TabBar({ name }: { name: keyof typeof manifest }) {
	return (
		<div className="relative">
			<div className="h-[var(--tab-bar-h)] bg-gray-200 shadow-[var(--hairline-shadow-t)]"></div>
			<div className="absolute right-0 bottom-0 left-0">
				<div className="flex">
					<TabBarCapL />
					<div className="flex items-center gap-4 rounded-t-[var(--tab-bar-rounding)] bg-white pr-32">
						<div className="flex h-[var(--tab-h)] w-[calc(var(--tab-h)_+_8px)] items-center justify-center">
							<ResizableIcon className="h-[var(--icon-size-1)] w-[var(--icon-size-1)] text-gray-800" icon={feather[name]} />
						</div>
						<div className="aspect-[16] h-6 rounded-1e3 bg-gray-300"></div>
					</div>
					<TabBarCapR />
				</div>
			</div>
		</div>
	)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function NavBarButton({ icon, ...props }: { icon: Icon } & Accessible<JSX.IntrinsicElements["button"]>) {
	return (
		<button
			className="flex h-[var(--hover-icon-size-2)] w-[var(--hover-icon-size-2)] items-center justify-center rounded-1e3
				hover:bg-gray-200
				hover:active:bg-gray-300"
			{...props}
		>
			<ResizableIcon className="h-[var(--icon-size-2)] rounded-1e3 text-gray-600" icon={icon} />
		</button>
	)
}

function UrlBarButton({ icon, ...props }: { icon: Icon } & Accessible<JSX.IntrinsicElements["button"]>) {
	return (
		<button
			className="flex h-[var(--hover-icon-size-2)] w-[var(--hover-icon-size-2)] items-center justify-center rounded-1e3
				hover:bg-gray-200
				hover:active:bg-gray-300"
			{...props}
		>
			<ResizableIcon className="text-300 h-[var(--icon-size-1)] w-[var(--icon-size-1)] text-gray-800" icon={icon} />
		</button>
	)
}

function NavBar() {
	const [bookmark, setBookmark] = useState(true)

	return (
		<div className="flex h-[var(--nav-bar-h)] items-center gap-8 bg-white px-8 shadow-[var(--hairline-shadow-b)]">
			<div className="flex">
				<NavBarButton
					icon={feather.ArrowLeft}
					onClick={e => window.history.back()}
					// prettier-ignore: aria-label
					aria-label="Navigate back"
				/>
				<NavBarButton
					icon={feather.ArrowRight}
					onClick={e => window.history.forward()}
					// prettier-ignore: aria-label
					aria-label="Navigate next"
				/>
				<NavBarButton
					icon={feather.RotateCw}
					onClick={e => window.location.reload()}
					// prettier-ignore: aria-label
					aria-label="Refresh"
				/>
			</div>
			<div className="flex grow items-center justify-between rounded-1e3 bg-gray-100">
				<UrlBarButton
					icon={feather.Info}
					// prettier-ignore: aria-label
					aria-label="Info"
				/>
				<div className="grow">
					<div className="aspect-[16] h-6 rounded-1e3 bg-gray-300"></div>
				</div>
				<UrlBarButton
					icon={feather.Star}
					style={{ fill: bookmark ? "current" : undefined }}
					onClick={e => setBookmark(curr => !curr)}
					// prettier-ignore: aria-label
					aria-label="Bookmark"
				/>
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
					"--tab-bar-rounding":  "10px",
					"--tab-bar-h":         "44px",
					"--tab-h":             "40px",
					"--nav-bar-h":         "48px",
					"--icon-size-1":       "20px",
					"--icon-size-2":       "24px",
					"--hover-icon-size-2": "36px", // E.g. 1.5x (24px)
				} as any
			}
		>
			<div className="flex h-100% flex-col">
				<div className="grow"></div>
				{/* Use relative because of var(--hairline-shadow-b) */}
				<div className="relative">
					<TabBar name={name} />
					<NavBar />
				</div>
				<div className="grow bg-white"></div>
			</div>
		</Container>
	)
}
