// TODO: This needs a11y

import * as feather from "../data/react-feather"

import { useContext, useState } from "react"
import { sizeInitial } from "../constants"
import { manifest } from "../data/manifest"
import { convertToKebabCase, convertToSpaceCase } from "../lib/cases"
import { SliderContext } from "../providers/state"
import { Anchor } from "./anchor"
import { Hoverable } from "./hoverable"
import { TwitterIcon } from "./icon-config"
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

export function DemoLogin({ name }: { name: keyof typeof manifest }) {
	const [eye, setEye] = useState(false)

	return (
		<Container
			style={
				// prettier-ignore
				{
					"--size":       "20px",
					"--hover-size": "30px", // E.g. 1.5x
				} as any
			}
		>
			<div className="flex h-100% items-center justify-center">
				{/* Username */}
				<div className="w-[calc(96px_*_2.5)] rounded-[calc(96px_*_0.1875)] bg-white shadow-[var(--shadow-2)]">
					<div className="flex justify-between">
						{/* LHS */}
						<div className="flex items-center">
							<div className="flex h-48 w-48 items-center justify-center">
								<ResizableIcon className="h-[var(--size)] w-[var(--size)] text-gray-700" icon={feather[name]} />
							</div>
							<div className="aspect-[16] h-6 rounded-1e3 bg-gray-300"></div>
						</div>
						{/* No RHS here */}
					</div>
					{/* Password */}
					<hr />
					<div className="flex justify-between">
						{/* LHS */}
						<div className="flex items-center">
							<div className="flex h-48 w-48 items-center justify-center">
								<ResizableIcon
									className="h-[var(--size)] w-[var(--size)] text-gray-300
										[&_>_rect]:fill-current"
									icon={feather.Lock}
								/>
							</div>
							<div className="aspect-[16] h-6 rounded-1e3 bg-gray-300"></div>
						</div>
						{/* RHS */}
						<div className="flex h-48 w-48 items-center justify-center">
							<button
								className="group/button flex h-[var(--hover-size)] w-[var(--hover-size)] items-center justify-center rounded-1e3
									hover:bg-gray-100 hover:active:bg-gray-200"
								onClick={e => setEye(curr => !curr)}
							>
								<ResizableIcon
									className="h-[var(--size)] w-[var(--size)] text-gray-300
										group-hover/button:text-gray-700"
									icon={eye ? feather.Eye : feather.EyeOff}
								/>
							</button>
						</div>
					</div>
				</div>
			</div>
		</Container>
	)
}

export function DemoGoldenAspectRatio({ name }: { name: keyof typeof manifest }) {
	const { size } = useContext(SliderContext)!

	return (
		<Container
			style={
				// prettier-ignore
				{
					"--size-1": "16px", // E.g. +16px
					"--size-2": "32px", // E.g. +16px
					"--size-3": "48px", // E.g. +16px
					"--size-4": "64px", // E.g. +16px

					"--size-1-container-w": "calc(var(--size-1) + var(--size-1))",
					"--size-2-container-w": "calc(var(--size-2) + var(--size-1))",
					"--size-3-container-w": "calc(var(--size-3) + var(--size-1))",
					"--size-4-container-w": "calc(var(--size-4) + var(--size-1))",
				} as any
			}
		>
			<div className="flex h-100% items-center justify-center">
				<Hoverable pos="center" content={`SIZE: ${(16 * size) / sizeInitial} PX`}>
					{/* Use cursor-help to override <button> behavior */}
					<button className="flex h-[var(--size-4)] w-[var(--size-1-container-w)] cursor-help items-center justify-center">
						<ResizableIcon className="rounded text-700 h-[var(--size-1)] w-[var(--size-1)]" icon={feather[name]} />
					</button>
				</Hoverable>
				<Hoverable pos="center" content={`SIZE: ${(32 * size) / sizeInitial} PX`}>
					{/* Use cursor-help to override <button> behavior */}
					<button className="flex h-[var(--size-4)] w-[var(--size-2-container-w)] cursor-help items-center justify-center">
						<ResizableIcon className="rounded text-700 h-[var(--size-2)] w-[var(--size-2)]" icon={feather[name]} />
					</button>
				</Hoverable>
				<Hoverable pos="center" content={`SIZE: ${(48 * size) / sizeInitial} PX`}>
					{/* Use cursor-help to override <button> behavior */}
					<button className="flex h-[var(--size-4)] w-[var(--size-3-container-w)] cursor-help items-center justify-center">
						<ResizableIcon className="rounded text-700 h-[var(--size-3)] w-[var(--size-3)]" icon={feather[name]} />
					</button>
				</Hoverable>
				<Hoverable pos="center" content={`SIZE: ${(64 * size) / sizeInitial} PX`}>
					{/* Use cursor-help to override <button> behavior */}
					<button className="flex h-[var(--size-4)] w-[var(--size-4-container-w)] cursor-help items-center justify-center">
						<ResizableIcon className="rounded text-700 h-[var(--size-4)] w-[var(--size-4)]" icon={feather[name]} />
					</button>
				</Hoverable>
			</div>
		</Container>
	)
}

// TODO: Add 8px top here
export function DemoChrome({ name }: { name: keyof typeof manifest }) {
	const [bookmark, setBookmark] = useState(true)

	return (
		<Container
			style={
				// prettier-ignore
				{
					"--rounding":     "10px",
					"--size-1":       "20px",
					"--size-2":       "24px",
					"--hover-size-2": "36px", // E.g. 1.5x (24px)
				} as any
			}
		>
			<div className="flex h-100% flex-col">
				<div className="grow"></div>
				{/* TODO */}
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
							<ResizableIcon className="h-[var(--size-1)] w-[var(--size-1)] text-gray-700" icon={feather[name]} />
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
				{/* Use z-index to prevent box-shadow from being clipped by sibling */}
				<div className="relative z-10 flex h-48 items-center gap-8 bg-white px-8 shadow-[var(--hairline-shadow-b)]">
					<div className="flex">
						<button
							className="group/button flex h-[var(--hover-size-2)] w-[var(--hover-size-2)] items-center justify-center rounded-1e3
								hover:bg-gray-100
								hover:active:bg-gray-200"
							onClick={e => window.history.back()}
						>
							<ResizableIcon className="h-[var(--size-2)] rounded-1e3 text-gray-500" icon={feather.ArrowLeft} />
						</button>
						<button
							className="group/button flex h-[var(--hover-size-2)] w-[var(--hover-size-2)] items-center justify-center rounded-1e3
								hover:bg-gray-100
								hover:active:bg-gray-200"
							onClick={e => window.history.forward()}
						>
							<ResizableIcon className="h-[var(--size-2)] rounded-1e3 text-gray-500" icon={feather.ArrowRight} />
						</button>
						<button
							className="group/button flex h-[var(--hover-size-2)] w-[var(--hover-size-2)] items-center justify-center rounded-1e3
								hover:bg-gray-100
								hover:active:bg-gray-200"
							onClick={e => window.location.reload()}
						>
							<ResizableIcon className="h-[var(--size-2)] rounded-1e3 text-gray-500" icon={feather.RotateCw} />
						</button>
					</div>
					<div className="flex grow justify-between rounded-1e3 bg-gray-100">
						{/* LHS */}
						<div className="flex items-center">
							<div className="flex h-[var(--hover-size-2)] w-[var(--hover-size-2)] items-center justify-center rounded-1e3 hover:bg-gray-200 hover:active:bg-gray-300">
								<ResizableIcon className="text-300 h-[var(--size-1)] w-[var(--size-1)] text-gray-700" icon={feather.Info} />
							</div>
							<div className="aspect-[16] h-6 rounded-1e3 bg-gray-300"></div>
						</div>
						{/* RHS */}
						<button
							className="flex h-[var(--hover-size-2)] w-[var(--hover-size-2)] items-center justify-center rounded-1e3 hover:bg-gray-200 hover:active:bg-gray-300"
							onClick={e => setBookmark(curr => !curr)}
						>
							<ResizableIcon
								className="text-300 h-[var(--size-1)] w-[var(--size-1)] text-gray-700 [&[data-state-fill]]:fill-current"
								icon={feather.Star}
								data-state-fill={bookmark || undefined}
							/>
						</button>
					</div>
				</div>
				<div className="grow bg-white"></div>
			</div>
		</Container>
	)
}

export function Demo4({ name }: { name: keyof typeof manifest }) {
	return <Container>{/* ... */}</Container>
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

export function DemoButton({ name }: { name: keyof typeof manifest }) {
	return (
		<Container>
			<div className="flex h-100% items-center justify-center">
				<div className="flex flex-col gap-8">
					<Anchor
						className="group/button flex items-center rounded-1e3 bg-white px-8 pr-32 shadow-[var(--shadow-2)] hover:bg-gray-100 hover:active:bg-[var(--theme-color)] hover:active:shadow-[var(--inset-shadow-2)]"
						href={`http://twitter.com/intent/tweet?text=${encodeURI(
							`Check out Feather – Simply beautiful open source icons\n\nIcons by @colebemis, website by @username_ZAYDEK feathericons.com 😍`
						)}`}
					>
						<div className="flex h-48 w-48 items-center justify-center">
							{/* Use !text-* here because icons may have colors */}
							<ResizableIcon className="h-20 w-20 text-gray-700 group-hover/button:group-active/button:!text-white" icon={feather[name]} />
						</div>
						<div className="aspect-[16] h-6 rounded-1e3 bg-gray-300 group-hover/button:group-active/button:bg-white"></div>
					</Anchor>
					<Anchor
						className="group/button flex items-center rounded-1e3 bg-white px-8 pr-32 shadow-[var(--shadow-2)] hover:bg-gray-100 hover:active:bg-[var(--theme-color)] hover:active:shadow-[var(--inset-shadow-2)]"
						href={`http://twitter.com/intent/tweet?text=${encodeURI(
							`Check out Feather – Simply beautiful open source icons\n\nIcons by @colebemis, website by @username_ZAYDEK feathericons.com 😍`
						)}`}
					>
						<div className="flex h-48 w-48 items-center justify-center">
							{/* Use !text-* here because icons may have colors */}
							<ResizableIcon className="h-20 w-20 text-gray-700 group-hover/button:group-active/button:!text-white" icon={TwitterIcon} />
						</div>
						<div className="aspect-[16] h-6 rounded-1e3 bg-gray-300 group-hover/button:group-active/button:bg-white"></div>
					</Anchor>
				</div>
			</div>
		</Container>
	)
}
