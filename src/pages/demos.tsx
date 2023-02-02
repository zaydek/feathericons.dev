import * as feather from "../data/react-feather"

import { SetStateAction, useCallback, useContext, useState } from "react"
import { AdjustableIcon } from "../components/adjustable-icon"
import { MouseTooltip } from "../components/mouse-tooltip"
import { sizeInitial } from "../constants"
import { manifest } from "../data/manifest"
import { SliderContext } from "../providers/state"

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
				{/* <div className="w-[calc(48px_*_5)] rounded-[calc(48px_*_0.3125)] bg-white shadow-[var(--shadow-2)]"> */}
				{/* TODO: Can we use aspect-ratio her? */}
				<div className="w-[calc(96px_*_2.5)] rounded-[calc(96px_*_0.1875)] bg-white shadow-[var(--shadow-2)]">
					<div className="flex justify-between">
						{/* LHS */}
						<div className="flex items-center">
							<div className="flex h-48 w-48 items-center justify-center">
								<AdjustableIcon className="h-20 w-20 text-gray-700" icon={feather[name]} />
							</div>
							<div className="aspect-[16] h-6 rounded-1e3 bg-gray-300"></div>
						</div>
					</div>
					<hr />
					<div className="flex justify-between">
						{/* LHS */}
						<div className="flex items-center">
							<div className="flex h-48 w-48 items-center justify-center">
								<AdjustableIcon className="h-20 w-20 text-gray-300 [&_>_rect]:fill-current" icon={feather.Lock} />
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
								<AdjustableIcon
									className="h-20 w-20 text-gray-300 group-hover/eye:text-gray-700"
									icon={eye ? feather.Eye : feather.EyeOff}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</DemoSlot>
	)
}

//// {/* <Container>
//// 	<div className="flex h-100% items-center justify-center gap-16" style={{ "--base": "16px", "--increment": 1 + 1 / 3 } as any}>
//// 		<ResizableIcon className="rounded text-700 h-[calc(var(--base)_+_var(--base)_*_var(--increment)_*_0)] w-[calc(var(--base)_+_var(--base)_*_var(--increment)_*_0)]" icon={feather.Feather} />
//// 		<ResizableIcon className="rounded text-700 h-[calc(var(--base)_+_var(--base)_*_var(--increment)_*_1)] w-[calc(var(--base)_+_var(--base)_*_var(--increment)_*_1)]" icon={feather.Feather} />
//// 		<ResizableIcon className="rounded text-700 h-[calc(var(--base)_+_var(--base)_*_var(--increment)_*_2)] w-[calc(var(--base)_+_var(--base)_*_var(--increment)_*_2)]" icon={feather.Feather} />
//// 		<ResizableIcon className="rounded text-700 h-[calc(var(--base)_+_var(--base)_*_var(--increment)_*_3)] w-[calc(var(--base)_+_var(--base)_*_var(--increment)_*_3)]" icon={feather.Feather} />
//// 	</div>
//// </Container> */}

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
				<MouseTooltip pos="center" content={`SIZE: ${(16 * size) / sizeInitial} PX`}>
					<div className="flex h-[var(--size-4)] w-[calc(var(--size-1)_+_var(--size-2))] cursor-pointer items-center justify-center">
						<AdjustableIcon className="rounded text-700 h-[var(--size-1)] w-[var(--size-1)]" icon={feather[name]} />
					</div>
				</MouseTooltip>
				<MouseTooltip pos="center" content={`SIZE: ${(32 * size) / sizeInitial} PX`}>
					<div className="flex h-[var(--size-4)] w-[calc(var(--size-2)_+_var(--size-2))] cursor-pointer items-center justify-center">
						<AdjustableIcon className="rounded text-700 h-[var(--size-2)] w-[var(--size-2)]" icon={feather[name]} />
					</div>
				</MouseTooltip>
				<MouseTooltip pos="center" content={`SIZE: ${(48 * size) / sizeInitial} PX`}>
					<div className="flex h-[var(--size-4)] w-[calc(var(--size-3)_+_var(--size-2))] cursor-pointer items-center justify-center">
						<AdjustableIcon className="rounded text-700 h-[var(--size-3)] w-[var(--size-3)]" icon={feather[name]} />
					</div>
				</MouseTooltip>
				<MouseTooltip pos="center" content={`SIZE: ${(64 * size) / sizeInitial} PX`}>
					<div className="flex h-[var(--size-4)] w-[calc(var(--size-4)_+_var(--size-2))] cursor-pointer items-center justify-center">
						<AdjustableIcon className="rounded text-700 h-[var(--size-4)] w-[var(--size-4)]" icon={feather[name]} />
					</div>
				</MouseTooltip>
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
				<div className="relative flex h-40 bg-gray-200 shadow-[var(--hairline-shadow-t)]">
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
					<div className="flex flex-[1] items-center rounded-t-10 bg-white">
						<div className="flex h-40 w-[calc(40px_*_1.25)] items-center justify-center">
							<AdjustableIcon className="h-24 w-24 text-gray-700" icon={feather[name]} />
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
						<div className="flex h-[calc(24px_*_1.5)] w-[calc(24px_*_1.5)] cursor-pointer items-center justify-center rounded-1e3 hover:bg-gray-100 hover:active:bg-gray-200">
							<AdjustableIcon className="h-24 w-24 rounded-1e3 text-gray-500" icon={feather.ArrowLeft} />
						</div>
						<div className="flex h-[calc(24px_*_1.5)] w-[calc(24px_*_1.5)] cursor-pointer items-center justify-center rounded-1e3 hover:bg-gray-100 hover:active:bg-gray-200">
							<AdjustableIcon className="h-24 w-24 rounded-1e3 text-gray-500" icon={feather.ArrowRight} />
						</div>
						<div className="flex h-[calc(24px_*_1.5)] w-[calc(24px_*_1.5)] cursor-pointer items-center justify-center rounded-1e3 hover:bg-gray-100 hover:active:bg-gray-200">
							<AdjustableIcon className="h-24 w-24 rounded-1e3 text-gray-500" icon={feather.RotateCw} />
						</div>
					</div>
					<div className="flex grow justify-between rounded-1e3 bg-gray-100">
						{/* LHS */}
						<div className="flex items-center">
							<div className="flex h-[calc(24px_*_1.5)] w-[calc(24px_*_1.5)] cursor-pointer items-center justify-center rounded-1e3 hover:bg-gray-200 hover:active:bg-gray-300">
								<AdjustableIcon className="text-300 h-20 w-20 text-gray-700" icon={feather.Info} />
							</div>
							<div className="aspect-[16] h-6 rounded-1e3 bg-gray-300"></div>
						</div>
						{/* RHS */}
						<div
							className="flex h-[calc(24px_*_1.5)] w-[calc(24px_*_1.5)] cursor-pointer items-center justify-center rounded-1e3 hover:bg-gray-200 hover:active:bg-gray-300"
							onClick={e => setBookmark(curr => !curr)}
						>
							<AdjustableIcon
								className="text-300 h-20 w-20 text-gray-700 [&[data-fill]]:fill-current"
								icon={feather.Star}
								data-fill={bookmark || undefined}
							/>
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
	const [fill1, _setFill1] = useState(true)
	const [fill2, _setFill2] = useState(false)
	const [fill3, setFill3] = useState(false)

	const setFill1 = useCallback((next: SetStateAction<boolean>) => {
		_setFill1(curr => {
			if (typeof next === "boolean") {
				_setFill2(!next)
				return curr
			} else {
				_setFill2(!next(curr))
				return next(curr)
			}
		})
	}, [])

	const setFill2 = useCallback((next: SetStateAction<boolean>) => {
		_setFill1(curr => {
			if (typeof next === "boolean") {
				_setFill1(!next)
				return curr
			} else {
				_setFill2(!next(curr))
				return next(curr)
			}
		})
	}, [])

	return (
		<DemoSlot>
			<div className="flex h-100% items-center justify-center gap-16">
				<div className="flex items-center gap-8">
					<div
						className="flex h-[calc(24px_*_1.5)] w-[calc(24px_*_1.5)] cursor-pointer items-center justify-center rounded-1e3 hover:bg-gray-200 hover:active:bg-gray-300"
						onClick={e => setFill1(curr => !curr)}
					>
						<AdjustableIcon
							className="h-24 w-24 text-gray-700"
							icon={feather.ThumbsUp}
							fill={fill1 ? "currentColor" : "none"}
						/>
					</div>
					<div className="aspect-[4] h-6 rounded-1e3 bg-gray-300"></div>
				</div>
				<div className="flex items-center gap-8">
					<div
						className="flex h-[calc(24px_*_1.5)] w-[calc(24px_*_1.5)] cursor-pointer items-center justify-center rounded-1e3 hover:bg-gray-200 hover:active:bg-gray-300"
						onClick={e => setFill2(curr => !curr)}
					>
						<AdjustableIcon
							className="h-24 w-24 text-gray-700"
							icon={feather.ThumbsDown}
							fill={fill2 ? "currentColor" : "none"}
						/>
					</div>
					<div className="aspect-[4] h-6 rounded-1e3 bg-gray-300"></div>
				</div>
				<div className="flex items-center gap-8">
					<div
						className="flex h-[calc(24px_*_1.5)] w-[calc(24px_*_1.5)] cursor-pointer items-center justify-center rounded-1e3 hover:bg-gray-200 hover:active:bg-gray-300"
						onClick={e => setFill3(curr => !curr)}
					>
						<AdjustableIcon
							className="h-24 w-24 text-gray-700"
							icon={feather[name]}
							fill={fill3 ? "currentColor" : "none"}
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
				<div className="group/button flex h-48 cursor-pointer items-center rounded-1e3 bg-white pr-32 shadow-[var(--shadow-2)] hover:bg-gray-100 hover:active:bg-[var(--theme-color)] hover:active:shadow-[var(--inset-shadow-2)]">
					{/* LHS */}
					<div className="flex h-48 w-48 items-center justify-center">
						<AdjustableIcon
							className="h-20 w-20 text-gray-700 group-hover/button:group-active/button:text-white"
							icon={feather[name]}
						/>
					</div>
					{/* RHS */}
					<div className="aspect-[16] h-6 rounded-1e3 bg-gray-300 group-hover/button:group-active/button:bg-white"></div>
				</div>
			</div>
		</DemoSlot>
	)
}
