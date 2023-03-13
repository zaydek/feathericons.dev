import * as feather from "../../data/react-feather"

import { useContext } from "react"
import { manifest } from "../../data/manifest"
import { sizeInitial } from "../constants"
import { Hoverable } from "../hoverable"
import { SliderContext } from "../providers/state"
import { ResizableIcon } from "../resizable-icon"
import { Container } from "./shared"

export function DemoGoldenAspectRatio({ name }: { name: keyof typeof manifest }) {
	const { size } = useContext(SliderContext)!

	return (
		<Container
			style={
				// prettier-ignore
				{
					"--icon-size-1-container-w": "calc(var(--icon-size-1) + var(--icon-size-1))",
					"--icon-size-2-container-w": "calc(var(--icon-size-2) + var(--icon-size-1))",
					"--icon-size-3-container-w": "calc(var(--icon-size-3) + var(--icon-size-1))",
					"--icon-size-4-container-w": "calc(var(--icon-size-4) + var(--icon-size-1))",

					"--icon-size-1": "16px",
					"--icon-size-2": "32px", // E.g. +16px
					"--icon-size-3": "48px", // E.g. +16px
					"--icon-size-4": "64px", // E.g. +16px
				} as any
			}
		>
			<div className="flex h-100% items-center justify-center">
				<Hoverable pos="center" content={`SIZE: ${(16 * size) / sizeInitial} PX`}>
					<div className="flex h-[var(--icon-size-4)] w-[var(--icon-size-1-container-w)] cursor-help items-center justify-center">
						<ResizableIcon
							className="rounded text-700 h-[var(--icon-size-1)] w-[var(--icon-size-1)]"
							component={feather[name]}
						/>
					</div>
				</Hoverable>
				<Hoverable pos="center" content={`SIZE: ${(32 * size) / sizeInitial} PX`}>
					<div className="flex h-[var(--icon-size-4)] w-[var(--icon-size-2-container-w)] cursor-help items-center justify-center">
						<ResizableIcon
							className="rounded text-700 h-[var(--icon-size-2)] w-[var(--icon-size-2)]"
							component={feather[name]}
						/>
					</div>
				</Hoverable>
				<Hoverable pos="center" content={`SIZE: ${(48 * size) / sizeInitial} PX`}>
					<div className="flex h-[var(--icon-size-4)] w-[var(--icon-size-3-container-w)] cursor-help items-center justify-center">
						<ResizableIcon
							className="rounded text-700 h-[var(--icon-size-3)] w-[var(--icon-size-3)]"
							component={feather[name]}
						/>
					</div>
				</Hoverable>
				<Hoverable pos="center" content={`SIZE: ${(64 * size) / sizeInitial} PX`}>
					<div className="flex h-[var(--icon-size-4)] w-[var(--icon-size-4-container-w)] cursor-help items-center justify-center">
						<ResizableIcon
							className="rounded text-700 h-[var(--icon-size-4)] w-[var(--icon-size-4)]"
							component={feather[name]}
						/>
					</div>
				</Hoverable>
			</div>
		</Container>
	)
}
