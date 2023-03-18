import * as feather from "../../data/react-feather"

import { manifest } from "../../data/manifest"
import { Component } from "../../utils/icon"
import { Anchor } from "../anchor"
import { twitterShareUrl } from "../constants"
import { TwitterIcon } from "../icon-config"
import { ResizableIcon } from "../resizable-icon"
import { Container } from "./-shared"

function ShareButton({ icon }: { icon: Component }) {
	return (
		<Anchor
			className="group/button flex items-center rounded-1e3 bg-white px-8 pr-32 shadow-[var(--shadow-2)]
				hover:active:bg-[var(--theme-color)]
				hover:active:shadow-[var(--inset-shadow-2)]"
			href={twitterShareUrl}
		>
			{/* Icon */}
			<div className="flex h-[var(--button-h)] w-[var(--button-h)] items-center justify-center">
				{/* Use !important here because of TwitterIcon */}
				<ResizableIcon
					className="h-[var(--icon-size)] w-[var(--icon-size)] text-gray-800 group-hover/button:group-active/button:!text-white"
					component={icon}
				/>
			</div>
			{/* Text */}
			<div className="aspect-[16] h-6 rounded-1e3 bg-gray-300 group-hover/button:group-active/button:bg-white"></div>
		</Anchor>
	)
}

export function DemoTwitter({ name }: { name: keyof typeof manifest }) {
	return (
		<Container
			style={
				// prettier-ignore
				{
					"--button-h":  "48px",
					"--icon-size": "20px",
				} as any
			}
		>
			<div className="flex h-100% items-center justify-center">
				<div className="flex flex-col gap-8">
					<ShareButton icon={feather[name]} />
					<ShareButton icon={TwitterIcon} />
				</div>
			</div>
		</Container>
	)
}
