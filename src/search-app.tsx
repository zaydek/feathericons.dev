import "./search-app.scss"

import * as feather from "./data/feather@4.29.0"

import { Fragment, HTMLAttributes, ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { manifest } from "./data/feather-manifest@4.29.0"
import { detab } from "./lib/format"
import { Icon } from "./lib/react/icon"

function useRestorableState<T>({ initialValue, zeroValue }: { initialValue: T, zeroValue: T }) {
	const [state, setState] = useState(initialValue)
	const [history, setHistory] = useState([state])
	const [historyIndex, setHistoryIndex] = useState(history.length - 1)

	const cycleState = useCallback((increment: number) => {
		if (increment > 0) {
			if (historyIndex + increment < history.length) {
				setHistoryIndex(curr => curr + increment)
			}
		} else {
			if (historyIndex + increment >= 0) {
				setHistoryIndex(curr => curr + increment)
			}
		}
	}, [history.length, historyIndex])

	// Commits state to history and historyIndex
	const onceRef = useRef(false)
	const commitState = useCallback(() => {
		if (!onceRef.current) {
			onceRef.current = true
			return
		}
		const timeoutId = setTimeout(() => {
			if (state === zeroValue || state === history[historyIndex]) { return }
			if (historyIndex === 0) { // At start
				// Append state (preserve zeroValue)
				setHistory(curr => [
					zeroValue,
					state,
					...curr.slice(1)
				])
				setHistoryIndex(curr => curr + 1)
			} else if (historyIndex + 1 === history.length) { // At end
				// Append state
				setHistory(curr => [
					...curr,
					state,
				])
				setHistoryIndex(curr => curr + 1)
			} else {
				// Insert state
				setHistory(curr => [
					...curr.slice(0, historyIndex),
					state,
					...curr.slice(historyIndex + 1),
				])
			}
		}, 500)
		return () => clearTimeout(timeoutId)
	}, [history, historyIndex, state, zeroValue])

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(commitState, [state])

	// history[historyIndex] -> state
	useEffect(() => {
		setState(history[historyIndex])
	}, [history, historyIndex])

	return [state, setState, cycleState] as const
}

// TODO: Make icon required?
function Tooltip({ icon, content, data, children, ...props }: { icon?: typeof Icon, content: ReactNode, data?: any } & HTMLAttributes<HTMLElement>) {
	const [show, setShow] = useState(true)

	// This is a trick to hide the tooltip on data changes
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
									{content}
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

function SearchResultsContents() {
	return <>
		{manifest.map(name => <Fragment key={name}>
			<Icon icon={feather[name]} className="w-50 h-50" width="24" height="24"  />
		</Fragment>)}
	</>
}

// TODO
document.documentElement.style.backgroundColor = "#fff"

export function SearchApp() {
	const [value, setValue, cycleValue] = useRestorableState({ initialValue: "", zeroValue: "" })
	const [order, setOrder] = useState<"forwards" | "backwards">("forwards")

	const toggleOrder = useCallback(() => {
		setOrder(curr => curr === "forwards" ? "backwards" : "forwards")
	}, [])

	return <>
		<div className="p-32 flex justify-center">
			<div className="basis-1e3 flex gap-20 [&_>_:nth-child(1)]:grow-1">
				<div className="flex flex-col gap-20">
					<div className="px-16 flex align-center h-64 rounded-1e3 [background-color]-#eee [&:is(:hover,_:focus-within)]:([background-color]-#fff [box-shadow]-$shadow-2) [&_>_:nth-child(2)]:grow-1">
						<SearchBarButton />
						<input
							className="px-16 h-64"
							type="text"
							value={value}
							onChange={e => setValue(e.currentTarget.value)}
							onKeyDown={e => {
								if (e.key === "ArrowUp") {
									e.preventDefault()
									cycleValue(-1)
								} else if (e.key === "ArrowDown") {
									e.preventDefault()
									cycleValue(+1)
								}
							}}
							autoFocus
						/>
						<Tooltip content={<>TOGGLE DARK MODE&nbsp;&nbsp;<span className="[opacity]-0.75">CTRL+D</span></>}>
							<SearchBarButton />
						</Tooltip>
					</div>
					<SearchResultsContents />
				</div>
				<div className="flex flex-col gap-20 w-300" style={{ order: order === "forwards" ? undefined : -1 }}>
					<div className="flex justify-end align-center h-64 [&_>_:nth-child(1)]:grow-1">
						<div className="flex align-center gap-10">
							<div className="h-16 w-16 rounded-1e3 [background-color]-#aaa"></div>
							<div>Hello, world!</div>
						</div>
						<Tooltip content={<>TOGGLE SIDEBAR ORIENTATION&nbsp;&nbsp;<span className="[opacity]-0.75">CTRL+\</span></>} data={order} onClick={toggleOrder}>
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
