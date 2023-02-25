import * as feather from "../../data/react-feather"

import { useState } from "react"
import { manifest } from "../../data/manifest"
import { Component } from "../../utils/icon"
import { Accessible } from "../aria/a11y"
import { ResizableIcon } from "../resizable-icon"
import { Container } from "./shared"

function InteractiveButton({ icon, ...props }: { icon: Component } & Accessible<JSX.IntrinsicElements["button"]>) {
	const [active, setActive] = useState(false)

	return (
		<button
			className="flex h-[var(--hover-icon-size)] w-[var(--hover-icon-size)] items-center justify-center rounded-1e3
				hover:bg-gray-200
				hover:active:bg-gray-300"
			onClick={e => setActive(curr => !curr)}
			data-state-active={active || undefined}
			{...props}
		>
			<ResizableIcon
				className="h-[var(--icon-size)] w-[var(--icon-size)] text-gray-800
					[[data-state-active]_&]:fill-current"
				component={icon}
			/>
		</button>
	)
}

function DecorativeButton({ icon, ...props }: { icon: Component }) {
	return (
		<div className="flex h-[var(--hover-icon-size)] w-[var(--hover-icon-size)] items-center justify-center rounded-1e3" {...props}>
			<ResizableIcon className="h-[var(--icon-size)] w-[var(--icon-size)] text-gray-800" component={icon} />
		</div>
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
						aria-label="Like"
					/>
					<div className="aspect-[6] h-6 rounded-1e3 bg-gray-300"></div>
				</div>
				<div className="flex items-center gap-8">
					<InteractiveButton
						icon={feather.ThumbsDown}
						// prettier-ignore: aria-label
						aria-label="Dislike"
					/>
					<div className="aspect-[6] h-6 rounded-1e3 bg-gray-300"></div>
				</div>
				<div className="flex items-center gap-8">
					<DecorativeButton icon={feather[name]} />
				</div>
			</div>
		</Container>
	)
}
