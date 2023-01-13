import "./search-app.scss"


import { HTMLAttributes, useCallback, useLayoutEffect, useState } from "react"
import { manifest } from "./data/manifest-v2"
import { detab } from "./lib/format"

type IconValue = keyof typeof manifest

function splitParts(str: string) {
	return str.split(/(?=[A-Z])|[^a-zA-Z0-9]+/)
		.filter(v => v !== "")
}

// TODO: Add icon
function Tooltip({ text, data, children, ...props }: { text: string, data: any } & HTMLAttributes<HTMLElement>) {
	const [show, setShow] = useState(true)

	useLayoutEffect(() => {
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
						<div className="px-10 flex align-center gap-10 h-32 rounded-10 [background-color]-#333 [box-shadow]-$realistic-shadow-6,_$realistic-shadow-6">
							<div className="h-16 w-16 rounded-1e3 [background-color]-#666"></div>
							<div className="[white-space]-pre [font]-500_10px_/_normal_$sans [letter-spacing]-0.1em [color]-#fff">
								{text}
							</div>
						</div>
					</div>
				</div>
			</>}
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

	//// useEffect(() => {
	//// 	function handleKeyDown(e: KeyboardEvent) {
	//// 		if (e.key === "d") {
	//// 			if (order === "forwards") {
	//// 				setOrder("backwards")
	//// 			} else {
	//// 				setOrder("forwards")
	//// 			}
	//// 		}
	//// 	}
	//// 	window.addEventListener("keydown", handleKeyDown, false)
	//// 	return () => window.addEventListener("keydown", handleKeyDown, false)
	//// }, [order])

	return <>
		<div className="p-32 flex justify-center">
			<div className="basis-1e3 flex gap-20 [&_>_:nth-child(1)]:grow-1">
				<div className="flex flex-col gap-20">
					<div className="flex flex-col h-64 rounded-1e3 [background-color]-#eee [&:focus-within]:([background-color]-#fff [box-shadow]-$shadow-2)">
						<input className="px-32 h-64" type="text" value={input} onChange={e => setInput(e.currentTarget.value)} />
					</div>
					<div>Search results</div>
				</div>
				<div className="flex flex-col gap-20 w-300" style={{ order: order === "forwards" ? undefined : -1 }}>
					<div className="flex justify-end align-center h-64 [&_>_:nth-child(1)]:grow-1">
						<div className="flex align-center gap-10">
							<div className="h-16 w-16 rounded-1e3 [background-color]-#aaa"></div>
							<div>Hello, world!</div>
						</div>
						<Tooltip text="MOVE SIDEBAR TO START" data={order} onClick={toggleOrder}>
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
