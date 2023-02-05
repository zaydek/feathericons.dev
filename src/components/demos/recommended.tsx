import * as feather from "../../data/react-feather"

import { manifest } from "../../data/manifest"
import { convertToKebabCase, convertToSpaceCase } from "../../lib/cases"
import { Anchor } from "../anchor"
import { Hoverable } from "../hoverable"
import { ResizableIcon } from "../resizable-icon"

export function Recommended({ name }: { name: keyof typeof manifest }) {
	return (
		<Hoverable pos="center" content={convertToSpaceCase(name).toUpperCase()}>
			<Anchor className="flex h-[var(--grid-size)] w-[var(--grid-size)] items-center justify-center" href={`/${convertToKebabCase(name).toLowerCase()}`}>
				<ResizableIcon className="h-32 w-32 text-gray-800" icon={feather[name]} />
			</Anchor>
		</Hoverable>
	)
}
