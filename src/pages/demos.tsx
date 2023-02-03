// TODO: This needs a11y

import * as feather from "../data/react-feather"

import { useContext, useState } from "react"
import { Hoverable } from "../components/hoverable"
import { TwitterIcon } from "../components/icon-config"
import { ResizableIcon } from "../components/resizable-icon"
import { Anchor } from "../components/star-prose"
import { sizeInitial } from "../constants"
import { manifest } from "../data/manifest"
import { convertToKebabCase, convertToSpaceCase } from "../lib/cases"
import { SliderContext } from "../providers/state"

export function Recommendation({ name }: { name: keyof typeof manifest }) {
	return (
		<Hoverable pos="center" content={convertToSpaceCase(name).toUpperCase()}>
			<Anchor
				//// className="flex h-[var(--grid-size)] w-[var(--grid-size)] items-center justify-center rounded-24 bg-gray-50 shadow-[var(--hairline-shadow)]"
				className="flex h-[var(--grid-size)] w-[var(--grid-size)] items-center justify-center"
				href={`/${convertToKebabCase(name).toLowerCase()}`}
			>
				<ResizableIcon className="h-32 w-32 text-gray-800" icon={feather[name]} />
			</Anchor>
		</Hoverable>
	)
}

function DemoSlot({ children, ...props }: JSX.IntrinsicElements["div"]) {
	return (
		<div className="h-256 overflow-clip rounded-24 bg-gray-50 shadow-[var(--hairline-shadow)]" {...props}>
			{children}
		</div>
	)
}

export function DemoLogin({ name }: { name: keyof typeof manifest }) {
	const [eye, setEye] = useState(false)

	return (
		<DemoSlot>
			<div className="flex h-100% items-center justify-center">
				<div className="w-[calc(96px_*_2.5)] rounded-[calc(96px_*_0.1875)] bg-white shadow-[var(--shadow-2)]">
					<div className="flex justify-between">
						{/* LHS */}
						<div className="flex items-center">
							<div className="flex h-48 w-48 items-center justify-center">
								<ResizableIcon className="h-20 w-20 text-gray-700" icon={feather[name]} />
							</div>
							<div className="aspect-[16] h-6 rounded-1e3 bg-gray-300"></div>
						</div>
					</div>
					<hr />
					<div className="flex justify-between">
						{/* LHS */}
						<div className="flex items-center">
							<div className="flex h-48 w-48 items-center justify-center">
								<ResizableIcon className="h-20 w-20 text-gray-300 [&_>_rect]:fill-current" icon={feather.Lock} />
							</div>
							<div className="aspect-[16] h-6 rounded-1e3 bg-gray-300"></div>
						</div>
						{/* RHS */}
						{/* eslint-disable jsx-a11y/click-events-have-key-events */}
						{/* eslint-disable jsx-a11y/no-static-element-interactions */}
						<div className="flex h-48 w-48 cursor-pointer items-center justify-center">
							<div
								className="group/eye flex h-[calc(20px_*_1.5)] w-[calc(20px_*_1.5)] items-center justify-center rounded-1e3 hover:bg-gray-100 hover:active:bg-gray-200"
								onClick={e => setEye(curr => !curr)}
							>
								<ResizableIcon className="h-20 w-20 fill-white text-gray-300 group-hover/eye:text-gray-700" icon={eye ? feather.Eye : feather.EyeOff} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</DemoSlot>
	)
}

export function DemoGoldenAspectRatio({ name }: { name: keyof typeof manifest }) {
	const { size } = useContext(SliderContext)!

	return (
		<DemoSlot>
			<div
				className="flex h-100% items-center justify-center"
				style={
					{
						"--size-1": "16px",
						"--size-2": "32px",
						"--size-3": "48px",
						"--size-4": "64px",
					} as any
				}
			>
				<Hoverable pos="center" content={`SIZE: ${(16 * size) / sizeInitial} PX`}>
					<div className="flex h-[var(--size-4)] w-[calc(var(--size-1)_+_var(--size-1))] cursor-help items-center justify-center">
						<ResizableIcon className="rounded text-700 h-[var(--size-1)] w-[var(--size-1)]" icon={feather[name]} />
					</div>
				</Hoverable>
				<Hoverable pos="center" content={`SIZE: ${(32 * size) / sizeInitial} PX`}>
					<div className="flex h-[var(--size-4)] w-[calc(var(--size-2)_+_var(--size-1))] cursor-help items-center justify-center">
						<ResizableIcon className="rounded text-700 h-[var(--size-2)] w-[var(--size-2)]" icon={feather[name]} />
					</div>
				</Hoverable>
				<Hoverable pos="center" content={`SIZE: ${(48 * size) / sizeInitial} PX`}>
					<div className="flex h-[var(--size-4)] w-[calc(var(--size-3)_+_var(--size-1))] cursor-help items-center justify-center">
						<ResizableIcon className="rounded text-700 h-[var(--size-3)] w-[var(--size-3)]" icon={feather[name]} />
					</div>
				</Hoverable>
				<Hoverable pos="center" content={`SIZE: ${(64 * size) / sizeInitial} PX`}>
					<div className="flex h-[var(--size-4)] w-[calc(var(--size-4)_+_var(--size-1))] cursor-help items-center justify-center">
						<ResizableIcon className="rounded text-700 h-[var(--size-4)] w-[var(--size-4)]" icon={feather[name]} />
					</div>
				</Hoverable>
			</div>
		</DemoSlot>
	)
}

export function DemoChrome({ name }: { name: keyof typeof manifest }) {
	const [bookmark, setBookmark] = useState(true)

	return (
		<DemoSlot>
			<div className="flex h-100% flex-col">
				<div className="grow"></div>
				<div className="relative flex bg-gray-200 shadow-[var(--hairline-shadow-t)]">
					{/* Cap */}
					<div className="relative w-10">
						<div className="absolute bottom-0 right-0">
							<div className="h-10 w-10 bg-white"></div>
							<div className="absolute inset-0">
								<div className="h-10 w-10 rounded-br-10 bg-gray-200"></div>
							</div>
						</div>
					</div>
					{/* Tab */}
					<div className="flex items-center rounded-t-10 bg-white pr-32">
						{/* Use w-48 here to be consistent */}
						<div className="flex h-40 w-48 items-center justify-center">
							<ResizableIcon className="h-20 w-20 text-gray-700" icon={feather[name]} />
						</div>
						<div className="aspect-[16] h-6 rounded-1e3 bg-gray-300"></div>
					</div>
					{/* Cap */}
					<div className="relative flex-[1]">
						<div className="absolute bottom-0 left-0">
							<div className="h-40 w-40 bg-white"></div>
							<div className="absolute inset-0">
								<div className="h-40 w-40 rounded-bl-10 bg-gray-200"></div>
							</div>
						</div>
					</div>
				</div>
				{/* Use z-index to prevent box-shadow from being clipped by sibling */}
				<div className="relative z-10 flex h-48 items-center gap-8 bg-white px-8 shadow-[var(--hairline-shadow-b)]">
					<div className="flex">
						<button
							className="group/button flex h-[calc(24px_*_1.5)] w-[calc(24px_*_1.5)] items-center justify-center rounded-1e3
								[&:not([aria-disabled])]:cursor-pointer
								[&:not([aria-disabled])]:hover:bg-gray-100
								[&:not([aria-disabled])]:hover:active:bg-gray-200"
							onClick={e => window.history.back()}
						>
							<ResizableIcon className="h-24 w-24 rounded-1e3 text-gray-500 group-aria-disabled/button:text-gray-300" icon={feather.ArrowLeft} />
						</button>
						<button
							className="group/button flex h-[calc(24px_*_1.5)] w-[calc(24px_*_1.5)] items-center justify-center rounded-1e3
								[&:not([aria-disabled])]:cursor-pointer
								[&:not([aria-disabled])]:hover:bg-gray-100
								[&:not([aria-disabled])]:hover:active:bg-gray-200"
							onClick={e => window.history.forward()}
							// TODO
							//// aria-disabled
						>
							<ResizableIcon className="h-24 w-24 rounded-1e3 text-gray-500 group-aria-disabled/button:text-gray-300" icon={feather.ArrowRight} />
						</button>
						<button
							className="group/button flex h-[calc(24px_*_1.5)] w-[calc(24px_*_1.5)] items-center justify-center rounded-1e3
								[&:not([aria-disabled])]:cursor-pointer
								[&:not([aria-disabled])]:hover:bg-gray-100
								[&:not([aria-disabled])]:hover:active:bg-gray-200"
							onClick={e => window.location.reload()}
						>
							<ResizableIcon className="h-24 w-24 rounded-1e3 text-gray-500 group-aria-disabled/button:text-gray-300" icon={feather.RotateCw} />
						</button>
					</div>
					<div className="flex grow justify-between rounded-1e3 bg-gray-100">
						{/* LHS */}
						<div className="flex items-center">
							<div className="flex h-[calc(24px_*_1.5)] w-[calc(24px_*_1.5)] cursor-pointer items-center justify-center rounded-1e3 hover:bg-gray-200 hover:active:bg-gray-300">
								<ResizableIcon className="text-300 h-20 w-20 text-gray-700" icon={feather.Info} />
							</div>
							<div className="aspect-[16] h-6 rounded-1e3 bg-gray-300"></div>
						</div>
						{/* RHS */}
						<div
							className="flex h-[calc(24px_*_1.5)] w-[calc(24px_*_1.5)] cursor-pointer items-center justify-center rounded-1e3 hover:bg-gray-200 hover:active:bg-gray-300"
							onClick={e => setBookmark(curr => !curr)}
						>
							<ResizableIcon className="text-300 h-20 w-20 text-gray-700 [&[data-fill]]:fill-current" icon={feather.Star} data-fill={bookmark || undefined} />
						</div>
					</div>
				</div>
				<div className="grow bg-white"></div>
			</div>
		</DemoSlot>
	)
}

export function Demo4({ name }: { name: keyof typeof manifest }) {
	return <DemoSlot>{/* ... */}</DemoSlot>
}

export function DemoSocialMedia({ name }: { name: keyof typeof manifest }) {
	const [fill1, setFill1] = useState(true)
	const [fill2, setFill2] = useState(false)
	const [fill3, setFill3] = useState(false)

	return (
		<DemoSlot>
			<div className="flex h-100% items-center justify-center gap-16">
				<div className="flex items-center gap-8">
					<div
						className="flex h-[calc(24px_*_1.5)] w-[calc(24px_*_1.5)] items-center justify-center rounded-1e3
							[&[data-fill]]:cursor-pointer
							[&[data-fill]]:hover:bg-gray-200
							[&[data-fill]]:hover:active:bg-gray-300"
						onClick={e => setFill1(curr => !curr)}
						data-fill
					>
						<ResizableIcon
							className="h-24 w-24 text-gray-700
								[&[data-fill]]:fill-current"
							icon={feather.ThumbsUp}
							data-fill={fill1 || undefined}
						/>
					</div>
					<div className="aspect-[4] h-6 rounded-1e3 bg-gray-300"></div>
				</div>
				<div className="flex items-center gap-8">
					<div
						className="flex h-[calc(24px_*_1.5)] w-[calc(24px_*_1.5)] items-center justify-center rounded-1e3
							[&[data-fill]]:cursor-pointer
							[&[data-fill]]:hover:bg-gray-200
							[&[data-fill]]:hover:active:bg-gray-300"
						onClick={e => setFill2(curr => !curr)}
						data-fill
					>
						<ResizableIcon
							className="h-24 w-24 text-gray-700
								[&[data-fill]]:fill-current"
							icon={feather.ThumbsDown}
							data-fill={fill2 || undefined}
						/>
					</div>
					<div className="aspect-[4] h-6 rounded-1e3 bg-gray-300"></div>
				</div>
				<div className="flex items-center gap-8">
					<div
						className="flex h-[calc(24px_*_1.5)] w-[calc(24px_*_1.5)] items-center justify-center rounded-1e3
							[&[data-fill]]:cursor-pointer
							[&[data-fill]]:hover:bg-gray-200
							[&[data-fill]]:hover:active:bg-gray-300"
						onClick={e => setFill3(curr => !curr)}
					>
						<ResizableIcon
							className="h-24 w-24 text-gray-700
								[&[data-fill]]:fill-current"
							icon={feather[name]}
						/>
					</div>
					<div className="aspect-[4] h-6 rounded-1e3 bg-gray-300"></div>
				</div>
			</div>
		</DemoSlot>
	)
}

export function DemoButton({ name }: { name: keyof typeof manifest }) {
	return (
		<DemoSlot>
			<div className="flex h-100% items-center justify-center">
				<div className="flex flex-col gap-8">
					<a
						className="group/button flex cursor-pointer items-center rounded-1e3 bg-white px-8 pr-32 shadow-[var(--shadow-2)] hover:bg-gray-100 hover:active:bg-[var(--theme-color)] hover:active:shadow-[var(--inset-shadow-2)]"
						href={`http://twitter.com/intent/tweet?text=${encodeURI(
							`Check out Feather – Simply beautiful open source icons\n\nIcons by @colebemis, website by @username_ZAYDEK feathericons.com 😍`
						)}`}
						rel="noopener noreferrer"
					>
						<div className="flex h-48 w-48 items-center justify-center">
							<ResizableIcon className="h-20 w-20 text-gray-700 group-hover/button:group-active/button:text-white" icon={feather[name]} />
						</div>
						<div className="aspect-[16] h-6 rounded-1e3 bg-gray-300 group-hover/button:group-active/button:bg-white"></div>
					</a>
					<a
						className="group/button flex cursor-pointer items-center rounded-1e3 bg-white px-8 pr-32 shadow-[var(--shadow-2)] hover:bg-gray-100 hover:active:bg-[var(--theme-color)] hover:active:shadow-[var(--inset-shadow-2)]"
						href={`http://twitter.com/intent/tweet?text=${encodeURI(
							`Check out Feather – Simply beautiful open source icons\n\nIcons by @colebemis, website by @username_ZAYDEK feathericons.com 😍`
						)}`}
						rel="noopener noreferrer"
					>
						<div className="flex h-48 w-48 items-center justify-center">
							<ResizableIcon className="h-20 w-20 text-gray-700 group-hover/button:group-active/button:text-white" icon={TwitterIcon} />
						</div>
						<div className="aspect-[16] h-6 rounded-1e3 bg-gray-300 group-hover/button:group-active/button:bg-white"></div>
					</a>
				</div>
			</div>
		</DemoSlot>
	)
}
