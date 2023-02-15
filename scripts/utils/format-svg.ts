import { convertToCamelCase } from "@/lib"

const svgStartAttrs = ["xmlns", "viewBox", "width", "height"] // prettier-ignore
const svgEndAttrs   = ["aria-hidden"] // prettier-ignore

function stringifyAttrs(sortedKeys: string[], attrs: NamedNodeMap, { strictJsx }: { strictJsx: boolean }) {
	let str = ""
	for (const sortedKey of sortedKeys) {
		const attr = attrs.getNamedItem(sortedKey)!
		if (attr === null) {
			if (sortedKey === "viewBox") {
				if (str !== "") { str += " " } // prettier-ignore
				const width = attrs.getNamedItem("width")!.value
				const height = attrs.getNamedItem("height")!.value
				str += `viewBox="0 0 ${width} ${height}"`
			}
		} else {
			if (str !== "") { str += " " } // prettier-ignore
			if (strictJsx) {
				str += `${convertToCamelCase(attr.name)}=${JSON.stringify(attr.value)}`
			} else {
				str += `${attr.name}=${JSON.stringify(attr.value)}`
			}
		}
	}
	return str
}

function filter<T>(arr: T[], excludes: T[]) {
	return arr.filter(value => !excludes.includes(value))
}

function sortKeys(tag: string, attrKeys: string[]) {
	const sorted = attrKeys.sort((k1, k2) => k1.localeCompare(k2))
	if (tag === "svg") {
		return [...new Set([...svgStartAttrs, ...filter(sorted, svgEndAttrs), ...svgEndAttrs])]
	} else {
		return sorted
	}
}

function formatSvgElement(ref: Element, nesting: number, { strictJsx }: { strictJsx: boolean }): string {
	let str = ""

	const tag = ref.tagName
	const keys = Object.values(ref.attributes).map(node => node.name)
	const sortedKeys = sortKeys(tag, keys)

	const attrs = stringifyAttrs(sortedKeys, ref.attributes, { strictJsx })
	if (ref.children.length === 0) {
		str = "  ".repeat(nesting) + `<${tag}${attrs === "" ? "" : ` ${attrs}`} />`
	} else {
		str = "  ".repeat(nesting) + `<${tag}${attrs === "" ? "" : ` ${attrs}`}>`
		for (const child of ref.children) {
			//// if (child.tagName === "defs") { continue } // prettier-ignore
			//// if (child.tagName === "g") {
			//// 	// <g><path /><path /></g>
			//// 	// -> <path /><path />
			//// 	for (const c of child.children) {
			//// 		str += "\n" + stringifyElement(c, nesting + 1)
			//// 	}
			//// } else {
			str += "\n" + formatSvgElement(child, nesting + 1, { strictJsx })
			//// }
		}
		str += "\n" + "  ".repeat(nesting) + `</${tag}>`
	}
	return str
}

export function formatSvg(ref: SVGSVGElement, { strictJsx = false }: { strictJsx?: boolean }) {
	return formatSvgElement(ref, 0, { strictJsx })
}
