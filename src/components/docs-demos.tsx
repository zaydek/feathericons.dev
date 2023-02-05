// TODO: This needs a11y

import * as feather from "../data/react-feather"

import { useState } from "react"
import { manifest } from "../data/manifest"
import { convertToKebabCase, convertToSpaceCase } from "../lib/cases"
import { Anchor } from "./anchor"
import { Hoverable } from "./hoverable"
import { ResizableIcon } from "./resizable-icon"

export function Recommended({ name }: { name: keyof typeof manifest }) {
	return (
		<Hoverable pos="center" content={convertToSpaceCase(name).toUpperCase()}>
			<Anchor className="flex h-[var(--grid-size)] w-[var(--grid-size)] items-center justify-center" href={`/${convertToKebabCase(name).toLowerCase()}`}>
				<ResizableIcon className="h-32 w-32 text-gray-800" icon={feather[name]} />
			</Anchor>
		</Hoverable>
	)
}

function Container({ children, ...props }: JSX.IntrinsicElements["div"]) {
	return (
		<div className="h-256 overflow-clip rounded-24 bg-gray-50 shadow-[var(--hairline-shadow)]" {...props}>
			{children}
		</div>
	)
}

export function DemoSocialMedia({ name }: { name: keyof typeof manifest }) {
	const [fill1, setFill1] = useState(true)
	const [fill2, setFill2] = useState(false)
	const [fill3, setFill3] = useState(false)

	return (
		<Container>
			<div className="flex h-100% items-center justify-center gap-16">
				<div className="flex items-center gap-8">
					<div
						className="flex h-[calc(24px_*_1.5)] w-[calc(24px_*_1.5)] items-center justify-center rounded-1e3
							[&[data-state-fill]]:cursor-pointer
							[&[data-state-fill]]:hover:bg-gray-200
							[&[data-state-fill]]:hover:active:bg-gray-300"
						onClick={e => setFill1(curr => !curr)}
						data-state-fill
					>
						<ResizableIcon
							className="h-24 w-24 text-gray-700
								[&[data-state-fill]]:fill-current"
							icon={feather.ThumbsUp}
							data-state-fill={fill1 || undefined}
						/>
					</div>
					<div className="aspect-[4] h-6 rounded-1e3 bg-gray-300"></div>
				</div>
				<div className="flex items-center gap-8">
					<div
						className="flex h-[calc(24px_*_1.5)] w-[calc(24px_*_1.5)] items-center justify-center rounded-1e3
							[&[data-state-fill]]:cursor-pointer
							[&[data-state-fill]]:hover:bg-gray-200
							[&[data-state-fill]]:hover:active:bg-gray-300"
						onClick={e => setFill2(curr => !curr)}
						data-state-fill
					>
						<ResizableIcon
							className="h-24 w-24 text-gray-700
								[&[data-state-fill]]:fill-current"
							icon={feather.ThumbsDown}
							data-state-fill={fill2 || undefined}
						/>
					</div>
					<div className="aspect-[4] h-6 rounded-1e3 bg-gray-300"></div>
				</div>
				<div className="flex items-center gap-8">
					<div
						className="flex h-[calc(24px_*_1.5)] w-[calc(24px_*_1.5)] items-center justify-center rounded-1e3
							[&[data-state-fill]]:cursor-pointer
							[&[data-state-fill]]:hover:bg-gray-200
							[&[data-state-fill]]:hover:active:bg-gray-300"
						onClick={e => setFill3(curr => !curr)}
					>
						<ResizableIcon
							className="h-24 w-24 text-gray-700
								[&[data-state-fill]]:fill-current"
							icon={feather[name]}
						/>
					</div>
					<div className="aspect-[4] h-6 rounded-1e3 bg-gray-300"></div>
				</div>
			</div>
		</Container>
	)
}
