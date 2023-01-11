import * as feather from "react-feather"

import { useMemo, useState } from "react"
import { manifest } from "./data/manifest-tags"
import { Icon } from "./lib/react/icon"

function safe(str: string) {
	return str.toLowerCase()
}

// name search v. tag search?
// mode: filter / highlight?

//// const names = Object.keys(manifest)

type IconValue = keyof typeof manifest

export function SearchApp() {
	const [search, setSearch] = useState("")

	const zeroValues = useMemo(() => {
		return Object.keys(manifest).map(name => [name, false] as readonly [name: IconValue, matches: boolean])
	}, [])

	//// for (const [name, tags /* TODO */] of Object.entries(manifest)) {

	const values = useMemo(() => {
		const $$search = safe(search)
		const $$searchExists = $$search !== ""

		const values: (readonly [name: IconValue, matches: boolean])[] = []
		let empty = true
		for (const name of Object.keys(manifest)) {
			const $$name = safe(name)
			const matches = $$searchExists && $$name.includes($$search)
			values.push([name as IconValue, matches])
			if (empty) {
				if (matches) {
					empty = false
				}
			}
		}
		if (empty) {
			return zeroValues
		} else {
			return values
		}
	}, [zeroValues, search])

	console.log(values)

	return <>
		<div className="py-64 px-32 flex justify-center">
			<div className="basis-1280 flex flex-col gap-64">
				<input className="mx-16 px-32 h-64 rounded-1e3 [font]-400_18px_/_normal_$sans bg-#eee" type="text" value={search} onChange={e => setSearch(e.currentTarget.value)} />
				<div className="grid grid-cols-repeat(auto-fill,_minmax(64px,_1fr)) grid-auto-rows-64">
					{values.map(([name, matches]) =>
						<div key={name} className="flex justify-center align-center">
							<Icon
								className="h-40 w-40"
								style={{
									opacity: matches ? "revert" : 0.5,
									transform: matches ? "revert" : "scale(0.75)",
									transition: "100ms ease",
									transitionProperty: "transform",
								}}
								// @ts-expect-error
								icon={feather[name]}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	</>
}
