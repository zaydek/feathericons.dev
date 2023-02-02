import { useContext, useState } from "react"
import { AdjustableIcon } from "../components/adjustable-icon"
import { MouseTooltip } from "../components/mouse-tooltip"
import { sizeInitial } from "../constants"
import * as feather from "../data/react-feather"
import { SliderContext } from "../providers/state"

function DemoSlot({ children, ...props }: JSX.IntrinsicElements["div"]) {
	return (
		<div className="h-256 overflow-clip rounded-24 bg-gray-50 shadow-[var(--hairline-shadow)]" {...props}>
			{children}
		</div>
	)
}

export function DemoLogin() {
	const [eye, setEye] = useState(false)

	return (
		<DemoSlot>
			<div className="flex h-100% items-center justify-center">
				{/* <div className="w-[calc(48px_*_5)] rounded-[calc(48px_*_0.3125)] bg-white shadow-[var(--shadow-2)]"> */}
				<div className="w-[calc(48px_*_5)] rounded-16 bg-white shadow-[var(--shadow-2)]">
					<div className="flex justify-between">
						{/* LHS */}
						<div className="flex items-center">
							<div className="flex h-48 w-48 items-center justify-center">
								<AdjustableIcon className="h-20 w-20 text-gray-700" icon={feather.Feather} />
							</div>
							<div className="aspect-[24] h-6 rounded-1e3 bg-gray-300"></div>
						</div>
					</div>
					<hr />
					<div className="flex justify-between">
						{/* LHS */}
						<div className="flex items-center">
							<div className="flex h-48 w-48 items-center justify-center">
								<AdjustableIcon className="h-20 w-20 text-gray-300" icon={feather.Lock} />
							</div>
							<div className="aspect-[16] h-6 rounded-1e3 bg-gray-300"></div>
						</div>
						{/* RHS */}
						{/* eslint-disable jsx-a11y/click-events-have-key-events */}
						{/* eslint-disable jsx-a11y/no-static-element-interactions */}
						<div className="flex h-48 w-48 cursor-pointer items-center justify-center">
							<div
								className="group/eye flex h-32 w-32 items-center justify-center rounded-1e3 hover:bg-gray-100 hover:active:bg-gray-200"
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

export function DemoGoldenAspectRatio() {
	const { size } = useContext(SliderContext)!

	return (
		<DemoSlot>
			<div
				className="flex h-100% items-center justify-center"
				style={
					{
						"--step-1": "16px",
						"--step-2": "32px",
						"--step-3": "48px",
						"--step-4": "64px",
					} as any
				}
			>
				<MouseTooltip pos="center" content={`SIZE: ${(16 * size) / sizeInitial} PX`}>
					<div
						className="flex h-[var(--step-4)] w-[calc(var(--step-1)_+_24px)] cursor-pointer items-center justify-center"
						onClick={async e => await navigator.clipboard.writeText(`${(16 * size) / sizeInitial}px`)}
					>
						<AdjustableIcon className="rounded text-700 h-[var(--step-1)] w-[var(--step-1)]" icon={feather.Feather} />
					</div>
				</MouseTooltip>
				<MouseTooltip pos="center" content={`SIZE: ${(32 * size) / sizeInitial} PX`}>
					<div
						className="flex h-[var(--step-4)] w-[calc(var(--step-2)_+_24px)] cursor-pointer items-center justify-center"
						onClick={async e => await navigator.clipboard.writeText(`${(32 * size) / sizeInitial}px`)}
					>
						<AdjustableIcon className="rounded text-700 h-[var(--step-2)] w-[var(--step-2)]" icon={feather.Feather} />
					</div>
				</MouseTooltip>
				<MouseTooltip pos="center" content={`SIZE: ${(48 * size) / sizeInitial} PX`}>
					<div
						className="flex h-[var(--step-4)] w-[calc(var(--step-3)_+_24px)] cursor-pointer items-center justify-center"
						onClick={async e => await navigator.clipboard.writeText(`${(48 * size) / sizeInitial}px`)}
					>
						<AdjustableIcon className="rounded text-700 h-[var(--step-3)] w-[var(--step-3)]" icon={feather.Feather} />
					</div>
				</MouseTooltip>
				<MouseTooltip pos="center" content={`SIZE: ${(64 * size) / sizeInitial} PX`}>
					<div
						className="flex h-[var(--step-4)] w-[calc(var(--step-4)_+_24px)] cursor-pointer items-center justify-center"
						onClick={async e => await navigator.clipboard.writeText(`${(64 * size) / sizeInitial}px`)}
					>
						<AdjustableIcon className="rounded text-700 h-[var(--step-4)] w-[var(--step-4)]" icon={feather.Feather} />
					</div>
				</MouseTooltip>
			</div>
		</DemoSlot>
	)
}

export function DemoChrome() {
	return (
		<DemoSlot>
			<div className="flex h-100% flex-col">
				<div className="grow"></div>
				{/* Use z-index to prevent box-shadow from being clipped by sibling */}
				<div className="relative z-10 flex h-40 bg-gray-200 shadow-[var(--hairline-shadow-t)]">
					{/* Cap */}
					<div className="relative w-10">
						<div className="absolute bottom-0 right-0">
							<div className="h-10 w-10 bg-white"></div>
							<div className="absolute inset-0">
								<div className="h-10 w-10 rounded-br-10 bg-gray-200"></div>
							</div>
						</div>
					</div>
					<div className="flex flex-[1] items-center rounded-t-10 bg-white">
						<div className="flex h-40 w-40 items-center justify-center">
							<AdjustableIcon className="h-20 w-20 text-gray-700" icon={feather.Feather} />
						</div>
						<div className="aspect-[12] h-6 rounded-1e3 bg-gray-300"></div>
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
				<div className="relative z-10 flex h-48 gap-16 bg-white p-8 shadow-[var(--hairline-shadow-b)]">
					<div className="flex">
						<div className="group/a flex h-32 w-32 items-center justify-center rounded-1e3 hover:bg-gray-100 hover:active:bg-gray-200">
							<AdjustableIcon className="h-20 w-20 rounded-1e3 text-gray-500" icon={feather.ArrowLeft} />
						</div>
						<div className="group/b flex h-32 w-32 items-center justify-center rounded-1e3">
							<AdjustableIcon className="h-20 w-20 rounded-1e3 text-gray-300" icon={feather.ArrowRight} />
						</div>
						<div className="group/c flex h-32 w-32 items-center justify-center rounded-1e3 hover:bg-gray-100 hover:active:bg-gray-200">
							<AdjustableIcon className="h-20 w-20 rounded-1e3 text-gray-500" icon={feather.RotateCw} />
						</div>
					</div>
					<div className="flex h-32 grow justify-between rounded-1e3 bg-gray-100 p-2">
						{/* LHS */}
						<div className="flex items-center gap-2">
							<div className="flex h-28 w-28 items-center justify-center rounded-1e3 hover:bg-gray-200 hover:active:bg-gray-300">
								<AdjustableIcon className="text-300 h-16 w-16 text-gray-700" icon={feather.Info} />
							</div>
							<div className="aspect-[16] h-6 rounded-1e3 bg-gray-300"></div>
						</div>
						{/* RHS */}
						<div className="flex h-28 w-28 items-center justify-center rounded-1e3 hover:bg-gray-200 hover:active:bg-gray-300">
							<AdjustableIcon className="text-300 h-16 w-16 text-gray-700" icon={feather.Star} />
						</div>
					</div>
				</div>
				<div className="grow bg-white"></div>
			</div>
		</DemoSlot>
	)
}
export function Demo4() {
	return <DemoSlot>{/* ... */}</DemoSlot>
}

export function DemoSocialMedia() {
	const [fillA, setFillA] = useState(false)
	const [fillB, setFillB] = useState(false)
	const [fillC, setFillC] = useState(false)
	const [fillD, setFillD] = useState(false)

	return (
		<DemoSlot>
			<div className="flex h-100% items-center justify-center gap-16">
				<div className="flex items-center gap-8">
					{/* TODO: Extract component here */}
					<div
						className="flex h-40 w-40 items-center justify-center rounded-1e3 hover:bg-sky-100 hover:active:bg-sky-200"
						onClick={e => setFillA(curr => !curr)}
					>
						<AdjustableIcon
							className="h-24 w-24 text-sky-700"
							icon={feather.ThumbsUp}
							fill={fillA ? "currentColor" : "none"}
						/>
					</div>
					<div className="aspect-[4] h-6 rounded-1e3 bg-sky-300"></div>
				</div>
				<div className="flex items-center gap-8">
					{/* TODO: Extract component here */}
					<div
						className="flex h-40 w-40 items-center justify-center rounded-1e3 hover:bg-sky-100 hover:active:bg-sky-200"
						onClick={e => setFillB(curr => !curr)}
					>
						<AdjustableIcon
							className="h-24 w-24 text-sky-700"
							icon={feather.ThumbsDown}
							fill={fillB ? "currentColor" : "none"}
						/>
					</div>
					<div className="aspect-[4] h-6 rounded-1e3 bg-sky-300"></div>
				</div>
				<div className="flex items-center gap-8">
					{/* TODO: Extract component here */}
					<div
						className="flex h-40 w-40 items-center justify-center rounded-1e3 hover:bg-sky-100 hover:active:bg-sky-200"
						onClick={e => setFillC(curr => !curr)}
					>
						<AdjustableIcon
							className="h-24 w-24 text-sky-700"
							icon={feather.Heart}
							fill={fillC ? "currentColor" : "none"}
						/>
					</div>
					<div className="aspect-[4] h-6 rounded-1e3 bg-sky-300"></div>
				</div>
				<div className="flex items-center gap-8">
					{/* TODO: Extract component here */}
					<div
						className="flex h-40 w-40 items-center justify-center rounded-1e3 hover:bg-sky-100 hover:active:bg-sky-200"
						onClick={e => setFillD(curr => !curr)}
					>
						<AdjustableIcon
							className="h-24 w-24 text-sky-700"
							icon={feather.Bookmark}
							fill={fillD ? "currentColor" : "none"}
						/>
					</div>
				</div>
			</div>
		</DemoSlot>
	)
}

export function DemoButton() {
	return (
		<DemoSlot>
			<div className="flex h-100% items-center justify-center">
				<div className="group/button flex h-48 cursor-pointer items-center rounded-1e3 bg-white pr-32 shadow-[var(--shadow-2)] hover:bg-gray-100 hover:active:bg-[var(--theme-color)] hover:active:shadow-[var(--inset-shadow-2)]">
					{/* LHS */}
					<div className="flex h-48 w-48 items-center justify-center">
						<AdjustableIcon
							className="h-20 w-20 text-gray-700 group-hover/button:group-active/button:text-white"
							icon={feather.Feather}
						/>
					</div>
					{/* RHS */}
					<div className="aspect-[16] h-6 rounded-1e3 bg-gray-300 group-hover/button:group-active/button:bg-white"></div>
				</div>
			</div>
		</DemoSlot>
	)
}
