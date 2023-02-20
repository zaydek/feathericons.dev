import * as feather from "../../data/react-feather"

import { manifest } from "../../data/manifest"
import { toKebabCase, toSpaceCase } from "../../lib/cases"
import { Anchor } from "../anchor"
import { Hoverable } from "../hoverable"
import { ResizableIcon } from "../resizable-icon"

export function Recommended({ name }: { name: keyof typeof manifest }) {
	return (
		<Hoverable pos="center" content={toSpaceCase(name).toUpperCase()}>
			<Anchor className="flex h-[var(--grid-size)] w-[var(--grid-size)] items-center justify-center" href={`/${toKebabCase(name).toLowerCase()}`}>
				<ResizableIcon className="h-32 w-32 text-gray-800" component={feather[name]} />
			</Anchor>
		</Hoverable>
	)
}
