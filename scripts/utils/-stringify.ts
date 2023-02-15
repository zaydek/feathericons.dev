import { convertToCamelCase } from "../../src/lib/cases"

type Configuration = {
	strictJsx: boolean
	omitAttrs: string[]
}

//// function stringifyAttrs(tag: string, attrKeys: string[], attrs: NamedNodeMap, config: Configuration) {
function stringifyAttrs(attrKeys: string[], attrs: NamedNodeMap, config: Configuration) {
	let str = ""
	for (const key of attrKeys) {
		if (config.omitAttrs.includes(key)) {
			continue
		}
		const attr = attrs.getNamedItem(key)!
		//// if (tag === "svg") {
		//// 	str += "\n  "
		//// } else if (str !== "") {
		//// 	str += " "
		//// }
		if (str !== "") {
			str += " "
		}
		if (config.strictJsx) {
			// TODO: Add class -> className here if needed
			if (attr.name === "viewBox" || attr.name === "aria-hidden") {
				// Reserved keywords
				str += `${attr.name}=${JSON.stringify(attr.value)}`
				//// } else if (isNaN(+attr.value) || tag !== "svg") { // Don't use {...} syntax on non <svg> elements
				//// 	// Non {...} syntax
				//// 	str += `${toCamelCase(attr.name)}=${JSON.stringify(attr.value)}`
				//// } else {
				//// 	// {...} syntax
				//// 	str += `${toCamelCase(attr.name)}={${attr.value}}`
				//// }
			} else {
				str += `${convertToCamelCase(attr.name)}=${JSON.stringify(attr.value)}`
			}
		} else {
			str += `${attr.name}=${JSON.stringify(attr.value)}`
		}
	}
	return str
}

function sortAttrKeys(attrKeys: string[]) {
	return attrKeys.sort((curr, next) => {
		if (curr === "aria-hidden" || curr === "d") {
			return 1
		}
		return curr.localeCompare(next)
	})
}

export function stringify(svgElement: SVGSVGElement, config: Configuration) {
	function recurse(ref: Element, nesting: number) {
		const arr: string[] = []

		const tabs = "\t".repeat(nesting)
		// <foo>
		//  ^^^
		const tag = ref.tagName
		// <foo bar>
		//      ^^^
		let attrKeys: string[]
		if (tag === "svg") {
			attrKeys = [
				...["xmlns", "viewBox", "width", "height"], // Viewbox uses w x h
				...["fill", "stroke", "stroke-linecap", "stroke-linejoin", "stroke-width"], // Sorted
			]
		} else {
			attrKeys = sortAttrKeys(Object.values(ref.attributes).map(attr => attr.name))
		}

		const str = stringifyAttrs(attrKeys, ref.attributes, config)
		if (ref.children.length > 0) {
			arr.push(`${tabs}<${tag} ${str}>`)
			for (const child of ref.children) {
				arr.push(...recurse(child, nesting + 1))
			}
			arr.push(`${tabs}</${tag}>`)
		} else {
			if (config.strictJsx) {
				arr.push(`${tabs}<${tag} ${str} />`)
			} else {
				arr.push(`${tabs}<${tag} ${str}></${tag}>`)
			}
		}
		return arr
	}
	return recurse(svgElement, 0).join("\n")
}
