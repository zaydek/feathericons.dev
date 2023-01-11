import * as feather from "react-feather"

import { useEffect, useMemo, useState } from "react"
import { manifest } from "./data/manifest-v2"
import { Icon } from "./lib/react/icon"

function safe(str: string) {
	return str.toLowerCase()
}

// name search v. tag search?
// mode: filter / highlight?

//// const names = Object.keys(manifest)

type IconValue = keyof typeof manifest

export function SearchApp() {
	const [hoverName, setHoverName] = useState<IconValue | "">("")
	const [search, setSearch] = useState("")

	//// const zeroValues = useMemo(() => {
	//// 	return Object.keys(manifest).map(name => [name, false] as readonly [name: IconValue, matches: boolean])
	//// }, [])

	//// for (const [name, tags /* TODO */] of Object.entries(manifest)) {

	const values = useMemo(() => {
		const $$search = safe(search)
		//// const $$searchExists = $$search !== ""

		const values: (readonly [name: IconValue, matches: boolean])[] = []
		//// let empty = true
		for (const name of Object.keys(manifest)) {
			const $$name = safe(name)
			//// const matches = $$searchExists && $$name.includes($$search)
			//// values.push([name as IconValue, matches])
			values.push([name as IconValue, $$name.includes($$search)])

			//// if (empty) {
			//// 	if (matches) {
			//// 		empty = false
			//// 	}
			//// }
		}
		//// if (empty) {
		//// 	return zeroValues
		//// } else {
		return values
		//// }
	}, [search])

	//// console.log(values)

	useEffect(() => {
		console.log(hoverName)
	}, [hoverName])

	return <>
		<div className="py-64 px-32 flex justify-center">
			<div className="basis-1280 flex flex-col gap-64">
				<input
					className="mx-16 px-32 h-64 rounded-1e3 [font]-400_18px_/_normal_$sans bg-#eee"
					type="text"
					value={search}
					onChange={e => setSearch(e.currentTarget.value)}
					autoFocus
				/>
				<div className="grid grid-cols-repeat(auto-fill,_minmax(64px,_1fr)) grid-auto-rows-64">
					{values.map(([name, matches]) =>
						<button
							key={name}
							className="flex justify-center align-center"
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
									color: (matches || hoverName === name) ? "hsl(0, 0%, 0%)" : "hsl(0, 0%, 75%)",
									transform: (matches || hoverName === name) ? "revert" : "scale(0.75)",
									transition: "100ms ease",
									transitionProperty: "color, transform",
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
