import * as feather from "../../data/react-feather"

import { useState } from "react"
import { manifest } from "../../data/manifest"
import { Icon } from "../dynamic-icon"
import { ResizableIcon } from "../resizable-icon"
import { Container } from "./shared"

function InteractiveButton({ icon, ...props }: { icon: Icon } & JSX.IntrinsicElements["button"] & { "aria-label": string }) {
	const [active, setActive] = useState(false)

	return (
		<button
			className="flex h-[var(--hover-icon-size)] w-[var(--hover-icon-size)] items-center justify-center rounded-1e3
				[&[data-state-active]]:hover:bg-gray-200
				[&[data-state-active]]:hover:active:bg-gray-300"
			onClick={e => setActive(curr => !curr)}
			data-state-active={active || undefined}
			{...props}
		>
			<ResizableIcon
				className="h-[var(--icon-size)] w-[var(--icon-size)] text-gray-700
					[[data-state-active]_&]:fill-current"
				icon={icon}
			/>
		</button>
	)
}

function NonInteractiveButton({ icon, ...props }: { icon: Icon } & JSX.IntrinsicElements["button"] & { "aria-label": string }) {
	return (
		<button className="flex h-[var(--hover-icon-size)] w-[var(--hover-icon-size)] items-center justify-center rounded-1e3" {...props}>
			<ResizableIcon className="h-[var(--icon-size)] w-[var(--icon-size)] text-gray-700" icon={icon} />
		</button>
	)
}

export function DemoSocialMedia({ name }: { name: keyof typeof manifest }) {
	return (
		<Container
			style={
				// prettier-ignore
				{
					"--icon-size":       "24px",
					"--hover-icon-size": "36px", // E.g. 1.5x (24px)
				} as any
			}
		>
			<div className="flex h-100% items-center justify-center gap-16">
				<div className="flex items-center gap-8">
					<InteractiveButton
						icon={feather.ThumbsUp}
						// prettier-ignore: aria-label
						aria-label="Thumbs up button"
					/>
					<div className="aspect-[4] h-6 rounded-1e3 bg-gray-300"></div>
				</div>
				<div className="flex items-center gap-8">
					<InteractiveButton
						icon={feather.ThumbsDown}
						// prettier-ignore: aria-label
						aria-label="Thumbs down button"
					/>
					<div className="aspect-[4] h-6 rounded-1e3 bg-gray-300"></div>
				</div>
				<div className="flex items-center gap-8">
					<NonInteractiveButton
						icon={feather[name]}
						// prettier-ignore: aria-label
						aria-label="Abstract button"
					/>
				</div>
			</div>
		</Container>
	)
}
