function nextSiblingElementIsLooselyEqual(node: Element) {
	const currElement = node
	const nextElement = node.nextSibling
	if (!(nextElement instanceof Element)) {
		return false
	}
	const currAttrs = [...currElement.attributes].filter(attr => attr.name !== "id")
	const nextAttrs = [...nextElement.attributes].filter(attr => attr.name !== "id")
	if (currAttrs.length !== nextAttrs.length) {
		return false
	}
	for (let index = 0; index < currAttrs.length; index++) {
		const currAttr = currAttrs[index]
		const nextAttr = nextAttrs[index]
		if (currAttr.name !== nextAttr.name || currAttr.value !== nextAttr.value) {
			return false
		}
	}
	return true
}

function currentElementIsSvgChildren(node: Element) {
	return node.parentElement !== null && node.parentElement.tagName.toLowerCase() === "svg"
}

function serializeNode(root: Element) {
	function recurse(root: Element, depth: number) {
		//// if (root.parentElement !== null && root.parentElement.nodeName.toLowerCase() === "svg") {
		////   return `${"  ".repeat(depth)}...\n`
		//// }
		let str = ""
		// div
		const tag = root.tagName.toLowerCase()
		str += `${"  ".repeat(depth)}${tag}`
		// #foo
		if (root.id !== "") {
			str += `#${root.getAttribute("id")}`
		}
		// .foo.bar.baz
		if (root.classList.length !== 0) {
			str += `.${[...root.classList].join(".")}`
		}
		// [foo="bar"][bar="baz"][baz="qux"]
		if (root.attributes.length !== 0) {
			const attrs = [...root.attributes].filter(attr => attr.name !== "id" && attr.name !== "class")
			for (const attr of attrs) {
				if (attr.value === "" || attr.value === "true") {
					str += `[${attr.name}]`
				} else {
					str += `[${attr.name}=${JSON.stringify(attr.value)}]`
				}
			}
		}
		str += "\n"
		let count = 0
		let isSvg = false
		for (const node of root.childNodes) {
			if (node instanceof Element) {
				if (nextSiblingElementIsLooselyEqual(node)) {
					count++
					continue
				} else if (currentElementIsSvgChildren(node)) {
					isSvg = true
					continue
				} else if (count > 0) {
					str += `${"  ".repeat(depth)}(...${count} more)\n`
				} else if (isSvg) {
					str += `${"  ".repeat(depth)}...\n`
				} else {
					str += recurse(node, depth + 1)
				}
			} else if (node instanceof Text) {
				str += `${"  ".repeat(depth + 1)}${JSON.stringify(node.nodeValue)}\n`
			}
		}
		return str
	}
	return recurse(root, 0)
}
