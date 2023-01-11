import "./search-app.scss"

import * as feather from "react-feather"

import { useEffect, useMemo, useRef, useState } from "react"
import { manifest } from "./data/manifest-v2"
import { Icon } from "./lib/react/icon"

type IconValue = keyof typeof manifest

function splitParts(str: string) {
	return str.split(/(?=[A-Z])|[^a-zA-Z0-9]+/)
		.filter(v => v !== "")
}

export function SearchApp() {
	const [hoverName, setHoverName] = useState<IconValue | "">("")

	const inputRef = useRef<HTMLInputElement | null>(null)
	const [search, setSearch] = useState("")

	const values = useMemo(() => {
		const values: (readonly [name: IconValue, matches: boolean])[] = []
		const $$search = splitParts(search).map(v => v.toLowerCase()).join("-")
		for (const name of Object.keys(manifest)) {
			const $$name = splitParts(name).map(v => v.toLowerCase()).join("-")
			values.push([
				name as IconValue,
				`-${$$name}`.includes(`-${$$search}`),
			])
			//// if (`-${$$name}`.includes(`-${$$search}`)) {
			//// 	values.push([
			//// 		name as IconValue,
			//// 		true,
			//// 	])
			//// }
		}
		return values
	}, [search])

	const [debouncedValues, setDebouncedValues] = useState(values)

	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === "Escape") {
				inputRef.current!.focus()
			}
		}
		window.addEventListener("keydown", handleKeyDown, false)
		return () => window.removeEventListener("keydown", handleKeyDown, false)
	}, [])

	const onceRef = useRef(false)
	useEffect(() => {
		if (!onceRef.current) {
			onceRef.current = true
			return
		}
		const timeoutId = setTimeout(() => {
			setDebouncedValues(values)
		}, 0)
		return () => {
			clearTimeout(timeoutId)
		}
	}, [values])

	useEffect(() => {
		console.log(hoverName)
	}, [hoverName])

	return <>
		<div className="p-32 flex justify-center">
			<div className="basis-2e3 flex flex-col gap-32">
				<input
					ref={inputRef}
					className="mx-16 px-32 h-64 rounded-1e3 [font]-400_18px_/_normal_$sans bg-#eee"
					type="text"
					value={search}
					onKeyDown={e => {
						if (e.key === "Escape") {
							setSearch("")
						}
					}}
					onChange={e => setSearch(e.currentTarget.value)}
					autoFocus
				/>
				<div className="grid grid-cols-repeat(auto-fill,_minmax(60px,_1fr)) grid-auto-rows-60">
					{debouncedValues
						//// .filter(([, matches]) => matches)
						.map(([name, matches], index) =>
							<button
								key={name}
								className="flex justify-center align-center effect-icon-hover"
								onPointerOver={e => {
									setHoverName(name)
								}}
								onPointerLeave={e => {
									setHoverName("")
								}}
							>
								<Icon
									className="h-40 w-40"
									style={{
										color: (matches || hoverName === name) ? "hsl(0, 0%, 10%)" : "hsl(0, 0%, 87.5%)",
										transform: (matches || hoverName === name) ? "scale(1)" : "scale(0.875)",
										transition: `50ms cubic-bezier(0, 1, 1, 2)`,
										transitionProperty: "transform",
									}}
									// @ts-expect-error
									icon={feather[name]}
								/>
							</button>
						)}
				</div>
			</div>
		</div>
	</>
}
