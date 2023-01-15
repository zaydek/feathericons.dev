import "./search-app.scss"

import * as feather from "./data/react-feather@4.29.0"

import { createContext, Dispatch, Fragment, HTMLAttributes, PropsWithChildren, ReactNode, SetStateAction, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { manifest } from "./data/react-feather-manifest@4.29.0"
import { detab } from "./lib/format"
import { Icon } from "./lib/react/icon"

function useRestorableState<T>(initialValue: T, zeroValue: T) {
	const [state, setState] = useState(initialValue)
	const [history, setHistory] = useState([state])
	const [historyIndex, setHistoryIndex] = useState(history.length - 1)

	const restoreState = useCallback((increment: number) => {
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

	return [state, setState, restoreState] as const
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
				<div className="py-12 absolute t-100% l-50% [transform]-translateX(-50%) [pointer-events]-none">
					<div className={detab(`
						[transform]-translateY(8px)
						[opacity]-0
						[transition]-100ms_cubic-bezier(0,_1,_1,_1)
						[transition-property]-transform,_opacity
							[[data-group]:hover_&]:([transform]-translateY(0px) [opacity]-1 [transition-delay]-100ms)
					`)}>
						{/* <div className="relative"> */}
							<div className="px-12 flex align-center gap-10 h-32 rounded-12 [background-color]-hsl(0,_0%,_99%) [box-shadow]-$shadow-6,_$realistic-shadow-6">
								{/* TODO: Draw icon here */}
								<div className="h-16 w-16 rounded-1e3 [background-color]-#666"></div>
								<div className="[white-space]-pre [font]-700_10px_/_normal_$sans [letter-spacing]-0.1em [color]-#333">
									{content}
								</div>
							</div>
							{/* <div className="absolute -t-2 x-0 flex justify-center">
								<div className="h-8 w-8 rounded-2 [background-color]-#fff [transform]-rotate(45deg)"></div>
							</div> */}
						{/* </div> */}
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

function BreakCases({ children }: { children: string }) {
	const parts = children.split(/(?=[A-Z])/)
	return <>
		{parts.map((part, index) => <Fragment key={part}>
			{index > 0 && <wbr />}
			{part}
		</Fragment>)}
	</>
}

function Highlight({ indexes, children }: { indexes: readonly [number, number] | null, children: string }) {
	if (indexes === null) {
		return <BreakCases>{children}</BreakCases>
	} else {
		return <>
			<BreakCases>{children.slice(0, indexes[0])}</BreakCases>
			<span className="[background-color]-hsl(200,_100%,_87.5%,_0.5) [box-shadow]-0_1px_0_0_hsl(200,_100%,_calc(87.5%_/_2),_0.5)">
				{children.slice(indexes[0], indexes[1])}
			</span>
			<BreakCases>{children.slice(indexes[1])}</BreakCases>
		</>
	}
}

function SearchResultsContents() {
	const { searchResults } = useContext(SearchContext)!

	return <>
		<div className="grid grid-cols-repeat(auto-fill,_minmax(96px,_1fr))">
			{Object.keys(searchResults).map(name => <Fragment key={name}>
				<div id={name} className="flex flex-col">
					<div className="flex flex-center h-80">
						{/* TODO: Use x as keyof typeof feather because of Object.keys */}
						<Icon className="h-32 w-32" icon={feather[name as keyof typeof feather]} />
					</div>
					<div className="flex flex-center wrap-wrap h-16 [text-align]-center [font-size]-12 [-webkit-user-select]-all [user-select]-all">
						{/* TODO: Use x as keyof typeof feather because of Object.keys */}
						<Highlight indexes={searchResults[name as keyof typeof feather]!}>
							{name}
						</Highlight>
					</div>
				</div>
			</Fragment>)}
		</div>
	</>
}

// TODO
document.documentElement.style.backgroundColor = "#fff"

function SearchApp() {
	//// const { search, setSearch, restoreSearch } = useContext(SearchContext)!
	const { search, setSearch } = useContext(SearchContext)!
	const { sidebarOrder, setSidebarOrder } = useContext(SidebarContext)!

	return <>
		<div className="p-32 flex justify-center">
			<div className="basis-2e3 flex gap-64 [&_>_:nth-child(1)]:grow-1">
				<div className="flex flex-col gap-64">
					<div className="px-16 flex align-center h-64 rounded-1e3 [background-color]-#eee [&:is(:hover,_:focus-within)]:([background-color]-#fff [box-shadow]-$shadow-2) [&_>_:nth-child(2)]:grow-1">
						<Tooltip content={<>SEARCH ICONS&nbsp;&nbsp;<span className="[opacity]-0.75">CTRL+/</span></>}>
							<SearchBarButton />
						</Tooltip>
						<input
							className="px-16 h-64"
							type="text"
							value={search}
							onChange={e => setSearch(e.currentTarget.value)}
							onKeyDown={e => {
								if (e.key === "ArrowUp") {
									e.preventDefault()
									//// restoreSearch(-1)
								} else if (e.key === "ArrowDown") {
									e.preventDefault()
									//// restoreSearch(+1)
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
				<div className="flex flex-col gap-20 w-300" style={{ order: sidebarOrder === "forwards" ? undefined : -1 }}>
					<div className="flex justify-end align-center h-64 [&_>_:nth-child(1)]:grow-1">
						<div className="flex align-center gap-10">
							<div className="h-16 w-16 rounded-1e3 [background-color]-#aaa"></div>
							<div>Hello, world!</div>
						</div>
						<Tooltip content={<>MOVE SIDEBAR&nbsp;&nbsp;<span className="[opacity]-0.75">CTRL+\</span></>} data={sidebarOrder} onClick={e => setSidebarOrder(curr => curr === "forwards" ? "backwards" : "forwards")}>
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

const SearchContext = createContext<{
	search:          string
	setSearch:       Dispatch<SetStateAction<string>>
	//// restoreSearch:   (_: number) => void
	searchResults:   Partial<Record<keyof typeof feather, readonly [number, number] | null>>
} | null>(null)

const SidebarContext = createContext<{
	sidebarOrder:    "forwards" | "backwards"
	setSidebarOrder: Dispatch<SetStateAction<"forwards" | "backwards">>
} | null>(null)

//// function isLower(char: string) { return char >= "a" && char <= "z" }
////
//// function searchImpl(str: string, substr: string) {
//// 	const index = str.indexOf(substr)
//// 	if (index === -1 || (index > 0 && !isLower(str[index - 1]))) { return null }
//// 	return [index, index + substr.length] as const
//// }

function getSubstringIndexes(str: string, substr: string) {
	const index = str.indexOf(substr)
	if (index === -1) { return null }
	return [index, index + substr.length] as const
}

function StateProvider({ children }: PropsWithChildren) {
	//// const [search, setSearch, restoreSearch] = useRestorableState("", "")
	const [search, setSearch] = useState("")

	const $$search = useMemo(() => {
		return search
			.replace(/[^a-zA-Z0-9]/g, "")
			.toLowerCase()
	}, [search])

	//// const $$regex = useMemo(() => {
	//// 	return new RegExp(search, "i")
	//// }, [search])

	const searchResultsFallback = useMemo(() => {
		const ref: Partial<Record<keyof typeof feather, readonly [number, number] | null>> = {}
		for (const name of Object.keys(manifest)) {
			ref[name as keyof typeof feather] = null
		}
		return ref
	}, [])


	// TODO: Sort results based on indexes
	const searchResults = useMemo(() => {
		if ($$search === "") { return searchResultsFallback }
		const refA: Partial<Record<keyof typeof feather, readonly [number, number] | null>> = {}
		const refB: Partial<Record<keyof typeof feather, readonly [number, number] | null>> = {}
		for (const [name, tags] of Object.entries(manifest)) {
			//// if (["^", "$", "|"].some(symbol => search.includes(symbol))) {
			//// 	$$regex.lastIndex = 0
			//// 	try {
			//// 		const matches = $$regex.exec(name)
			//// 		if (!(matches === null)) {
			//// 			ref[name as keyof typeof feather] = null //// indexes
			//// 		}
			//// 	} catch {/* No-op */}
			const indexes = getSubstringIndexes(name.toLowerCase(), $$search)
			if (indexes !== null) {
				refA[name as keyof typeof feather] = indexes
			} else {
				for (const tag of tags) {
					if (tag.startsWith($$search)) {
						refB[name as keyof typeof feather] = null
					}
				}
			}
		}
		return { ...refA, ...refB }
	}, [$$search, searchResultsFallback])

	const [sidebarOrder, setSidebarOrder] = useState<"forwards" | "backwards">("forwards")

	return <>
		<SearchContext.Provider value={useMemo(() => ({
			search,
			setSearch,
			//// restoreSearch,
			searchResults,
		//// }), [restoreSearch, search, searchResults, setSearch])}>
		}), [search, searchResults, setSearch])}>
			<SidebarContext.Provider value={useMemo(() => ({
				sidebarOrder,
				setSidebarOrder,
			}), [sidebarOrder])}>
				{children}
			</SidebarContext.Provider>
		</SearchContext.Provider>
	</>
}

export function ProvidedSearchApp() {
	return <>
		<StateProvider>
			<SearchApp />
		</StateProvider>
	</>
}
