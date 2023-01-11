import "./search-app.scss"

import * as feather from "react-feather"

import { useEffect, useMemo, useRef, useState } from "react"
import { manifest } from "./data/manifest-v2"
import { Icon } from "./lib/react/icon"

// name search v. tag search?
// mode: filter / highlight?

//// const names = Object.keys(manifest)

type IconValue = keyof typeof manifest

//// const isLower = (ch: string) => ch >= "a" && ch <= "z"

//// function searchParts(str: string, substr: string) {
//// 	if (substr.split("-"))
////
//// 	//// const index = str.indexOf(substr)
//// 	//// if (index === -1 || (index > 0 && !isLower(str[index - 1]))) { return null }
//// 	//// return [index, index + substr.length] as const
//// }

//// const isLower = (ch: string) => ch >= "a" && ch <= "z"
//// const isUpper = (ch: string) => ch >= "A" && ch <= "Z"
//// const isDigit = (ch: string) => ch >= "0" && ch <= "9"
//// const isAlpha = (ch: string) => isLower(ch) || isUpper(ch) || isDigit(ch)
////
//// function splitParts(str: string) {
//// 	const parts = []
//// 	outer:
//// 	for (let curr = 0; curr < str.length; curr++) {
//// 		for (let next = curr; next < str.length; next++) {
//// 			if ((isLower(str[next]) || isDigit(str[next])) &&        // E.g. [a-z0-9]
//// 					(next + 1 < str.length && isUpper(str[next + 1]))) { // E.g. [A-Z]
//// 				parts.push(str.slice(curr, next + 1))
//// 				curr = next
//// 				break
//// 			} else if (!isAlpha(str[next]) &&                        // E.g. [^a-zA-Z0-9]
//// 					(next + 1 < str.length && isAlpha(str[next + 1]))) { // E.g. [a-zA-Z0-9]
//// 				parts.push(str.slice(curr, next + 0)) // Remove non-alpha
//// 				curr = next
//// 				break
//// 			} else if (next + 1 === str.length) {
//// 				parts.push(str.slice(curr))
//// 				break outer // Done
//// 			}
//// 		}
//// 	}
//// 	return parts
//// }

function splitParts(str: string) {
	return str.split(/(?=[A-Z])|[^a-zA-Z0-9]+/)
		.filter(v => v !== "")
}

export function SearchApp() {
	const [hoverName, setHoverName] = useState<IconValue | "">("")

	const inputRef = useRef<HTMLInputElement | null>(null)
	const [search, setSearch] = useState("")

	//// const zeroValues = useMemo(() => {
	//// 	return Object.keys(manifest).map(name => [name, false] as readonly [name: IconValue, matches: boolean])
	//// }, [])

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
		}, 100)
		return () => {
			clearTimeout(timeoutId)
		}
	}, [values])

	useEffect(() => {
		console.log(hoverName)
	}, [hoverName])

	return <>
		<div className="p-32 flex justify-center">
			<div className="basis-1280 flex flex-col gap-32">
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
					{debouncedValues.map(([name, matches], index) =>
						//// <MemoGridItem
						//// 	key={name}
						//// 	name={name}
						//// 	matches={matches}
						//// 	hoverName={hoverName}
						//// 	setHoverName={setHoverName}
						//// />

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
									//// transition: `100ms cubic-bezier(0, 1, 1, 1.25) ${index * 2}ms`,
									//// transition: `20ms cubic-bezier(0, 1, 1, 1)`,

									//// transition: `100ms cubic-bezier(0, 1, 1, 1.25)`,
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

//// const MemoGridItem = memo(function GridItem({ name, matches, hoverName, setHoverName }: { name: IconValue, matches: boolean, hoverName: IconValue | "", setHoverName: Dispatch<SetStateAction<IconValue | "">> }) {
//// 	return <>
//// 		<button
//// 			className="flex justify-center align-center effect-icon-hover"
//// 			onPointerOver={e => {
//// 				setHoverName(name)
//// 			}}
//// 			onPointerLeave={e => {
//// 				setHoverName("")
//// 			}}
//// 		>
//// 			<Icon
//// 				className="h-40 w-40"
//// 				style={{
//// 					color: (matches || hoverName === name) ? "hsl(0, 0%, 10%)" : "hsl(0, 0%, 90%)",
//// 					transform: (matches || hoverName === name) ? "revert" : "scale(0.9)",
//// 					transition: "100ms cubic-bezier(0, 1, 1, 1.25)",
//// 					transitionProperty: "transform",
//// 				}}
//// 				// @ts-expect-error
//// 				icon={feather[name]}
//// 			/>
//// 		</button>
//// 	</>
//// })
