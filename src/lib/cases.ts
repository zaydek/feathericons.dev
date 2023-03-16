// prettier-ignore
export function toKebabCase(str: string) {
	return str.replace(/([a-zA-Z0-9])([A-Z])/g, "$1-$2")
	          .replace(/([a-zA-Z])([0-9])/g, "$1-$2").toLowerCase()
}

// prettier-ignore
export function toSnakeCase(str: string) {
	return str.replace(/([a-zA-Z0-9])([A-Z])/g, "$1_$2")
	          .replace(/([a-zA-Z])([0-9])/g, "$1_$2").toLowerCase()
}

// prettier-ignore
export function toSpaceCase(str: string) {
	return str.replace(/([a-zA-Z0-9])([A-Z])/g, "$1 $2")
	          .replace(/([a-zA-Z])([0-9])/g, "$1 $2")
}

export function toCamelCase(str: string) {
	return str.replace(/-([a-zA-Z0-9])/g, (_, $1) => $1.toUpperCase())
}

export function toTitleCase(str: string) {
	const str2 = toCamelCase(str)
	return str2.slice(0, 1).toUpperCase() + str2.slice(1)
}
