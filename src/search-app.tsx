import "./search-app.scss"

import { HTMLAttributes, useCallback, useLayoutEffect, useState } from "react"
import { detab } from "./lib/format"
import { Icon } from "./lib/react/icon"

// TODO: Make icon required?
function Tooltip({ icon, text, data, children, ...props }: { icon?: typeof Icon, text: string, data?: any } & HTMLAttributes<HTMLElement>) {
	const [show, setShow] = useState(true)

	useLayoutEffect(() => {
		if (data === undefined) { return }
		setShow(false)
		setTimeout(() => {
			setShow(true)
		}, 0)
	}, [data])

	return <>
		<div className="relative" data-group {...props}>
			{children}
			{show && <>
				<div className="py-10 absolute t-100% l-50% [transform]-translateX(-50%) [pointer-events]-none">
					<div className={detab(`
						[transform]-translateY(8px)
						[opacity]-0
						[transition]-100ms_cubic-bezier(0,_1,_1,_1)
						[transition-property]-transform,_opacity
							[[data-group]:hover_&]:([transform]-translateY(0px) [opacity]-1 [transition-delay]-100ms)
					`)}>
						<div className="relative">
							<div className="px-10 flex align-center gap-10 h-32 rounded-10 [background-color]-#333 [box-shadow]-$realistic-shadow-6,_$realistic-shadow-6">
								{/* TODO: Draw icon here */}
								<div className="h-16 w-16 rounded-1e3 [background-color]-#666"></div>
								<div className="[white-space]-pre [font]-500_10px_/_normal_$sans [letter-spacing]-0.1em [color]-#fff">
									{text}
								</div>
							</div>
							<div className="absolute -t-2 x-0 flex justify-center">
								<div className="h-8 w-8 rounded-2 [background-color]-#333 [transform]-rotate(45deg)"></div>
							</div>
						</div>
					</div>
				</div>
			</>}
		</div>
	</>
}

function SearchBarButton(props: HTMLAttributes<HTMLElement>) {
	return <>
		<div className="flex flex-center h-32 w-32 rounded-1e3 [background-color]-pink" {...props}>
			<div className="h-16 w-16 rounded-1e3 [background-color]-red"></div>
		</div>
	</>
}

export function SearchApp() {
	const [input, setInput] = useState("")
	const [inputHistory, setInputHistory] = useState<string[]>([])

	const [order, setOrder] = useState<"forwards" | "backwards">("forwards")

	const toggleOrder = useCallback(() => {
		setOrder(curr => curr === "forwards" ? "backwards" : "forwards")
	}, [])

	useLayoutEffect(() => {
		document.documentElement.style.backgroundColor = "#fff"
	}, [])

	return <>
		<div className="p-32 flex justify-center">
			<div className="basis-1e3 flex gap-20 [&_>_:nth-child(1)]:grow-1">
				<div className="flex flex-col gap-20">
					<div className="px-16 flex align-center h-64 rounded-1e3 [background-color]-#eee [&:is(:hover,_:focus-within)]:([background-color]-#fff [box-shadow]-$shadow-2) [&_>_:nth-child(2)]:grow-1">
						<SearchBarButton />
						<input className="px-16 h-64" type="text" value={input} onChange={e => setInput(e.currentTarget.value)} />
						<Tooltip text="TOGGLE DARK MODE">
							<SearchBarButton />
						</Tooltip>
					</div>
					<div>Search results</div>
				</div>
				<div className="flex flex-col gap-20 w-300" style={{ order: order === "forwards" ? undefined : -1 }}>
					<div className="flex justify-end align-center h-64 [&_>_:nth-child(1)]:grow-1">
						<div className="flex align-center gap-10">
							<div className="h-16 w-16 rounded-1e3 [background-color]-#aaa"></div>
							<div>Hello, world!</div>
						</div>
						<Tooltip text="TOGGLE SIDEBAR" data={order} onClick={toggleOrder}>
							{/* TODO: Remove [cursor]-pointer */}
							<div className="flex flex-center h-32 w-32 rounded-1e3 [background-color]-#eee [cursor]-pointer [&:hover]:([background-color]-#fff [box-shadow]-$shadow-2)">
								<div className="h-16 w-16 rounded-1e3 [background-color]-#aaa"></div>
							</div>
						</Tooltip>
					</div>
					<div>Sidebar</div>
				</div>
			</div>
		</div>
	</>
}
