import { convertToCamelCase } from "@/lib"

const svgStartProps = ["xmlns", "viewBox", "width", "height"] // prettier-ignore
const svgEndAttrs   = ["aria-hidden"] // prettier-ignore
const pathEndAttrs  = ["d"] // prettier-ignore

function stringifyAttrs(sortedKeys: string[], attrs: NamedNodeMap, strictJsx: boolean = false) {
	let str = ""
	for (const sortedKey of sortedKeys) {
		if (str !== "") { str += " " } // prettier-ignore
		const attr = attrs.getNamedItem(sortedKey)!
		if (strictJsx && attr.name !== "viewBox") {
			str += `${convertToCamelCase(attr.name)}=${JSON.stringify(attr.value)}`
		} else {
			if (attr === null && sortedKey === "viewBox") {
				// prettier-ignore
				str += `viewBox="0 0 ` +
					`${attrs.getNamedItem("width")!.value} ` +
					`${attrs.getNamedItem("height")!.value}"`
			} else {
				str += `${attr.name}=${JSON.stringify(attr.value)}`
			}
		}
	}
	return str
}

function sortKeys(tag: string, attrKeys: string[]) {
	const sorted = attrKeys.sort((k1, k2) => {
		if (tag === "svg"  && svgEndAttrs.includes(k1))  { return 1 } // prettier-ignore
		if (tag === "path" && pathEndAttrs.includes(k1)) { return 1 } // prettier-ignore
		return k1.localeCompare(k2)
	})
	if (tag === "svg") {
		return [...new Set([...svgStartProps, ...sorted])]
	} else {
		return sorted
	}
}

function stringifyElement(ref: Element, nesting: number): string {
	let str = ""

	const tag = ref.tagName
	const keys = Object.values(ref.attributes).map(node => node.name)
	const sortedKeys = sortKeys(tag, keys)

	if (ref.children.length === 0) {
		str = "  ".repeat(nesting) + `<${tag} ${stringifyAttrs(sortedKeys, ref.attributes)} />`
	} else {
		str = "  ".repeat(nesting) + `<${tag} ${stringifyAttrs(sortedKeys, ref.attributes)}>`
		for (const child of ref.children) {
			//// if (child.tagName === "defs") { continue } // prettier-ignore
			//// if (child.tagName === "g") {
			//// 	// <g><path /><path /></g>
			//// 	// -> <path /><path />
			//// 	for (const c of child.children) {
			//// 		str += "\n" + stringifyElement(c, nesting + 1)
			//// 	}
			//// } else {
			str += "\n" + stringifyElement(child, nesting + 1)
			//// }
		}
		str += "\n" + "  ".repeat(nesting) + `</${tag}>`
	}
	return str
}

export function stringifySvgElement(ref: SVGSVGElement) {
	return stringifyElement(ref, 0)
}
