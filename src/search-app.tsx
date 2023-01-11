import * as feather from "react-feather"

import { useMemo, useState } from "react"
import { manifest } from "./data/manifest-tags"
import { Icon } from "./lib/react/icon"

function safe(str: string) {
	return str.toLowerCase()
}

// name search v. tag search?
// mode: filter / highlight?

const names = Object.keys(manifest)

export function SearchApp() {
	const [search, setSearch] = useState("")

	const matches = useMemo(() => {
		const $$search = safe(search)
		const matches = []
		for (const [name, tags /* TODO */] of Object.entries(manifest)) {
			if (safe(name).includes($$search)) {
				matches.push(name)
			}
		}
		//// return matches.length === 0 ? names : matches
		return matches
	}, [search])

	console.log(matches)

	return <>
		<div className="py-64 px-32 flex justify-center">
			<div className="basis-1280 flex flex-col gap-64">
				<input className="mx-16 px-32 h-64 rounded-1e3 [font]-400_18px_/_normal_$sans bg-#eee" type="text" value={search} onChange={e => setSearch(e.currentTarget.value)} />
				<div className="grid grid-cols-repeat(auto-fill,_minmax(64px,_1fr)) grid-auto-rows-64">
					{matches.map(name =>
						<div key={name} className="flex justify-center align-center">
							{/* @ts-expect-error */}
							<Icon className="h-40 w-40" icon={feather[name]} />
						</div>
					)}
				</div>
			</div>
		</div>
	</>
}
