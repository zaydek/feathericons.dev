export function toKebabCase(str: string) {
	return str
		.replace(/([a-z])([A-Z0-9])/g, "$1-$2")
		.replace(/([A-Z])([A-Z0-9])/g, "$1-$2")
		.replace(/([0-9])([a-zA-Z])/g, "$1-$2")
}

export function toSnakeCase(str: string) {
	return str
		.replace(/([a-z])([A-Z0-9])/g, "$1_$2")
		.replace(/([A-Z])([A-Z0-9])/g, "$1_$2")
		.replace(/([0-9])([a-zA-Z])/g, "$1_$2")
}

export function toSpaceCase(str: string) {
	return str
		.replace(/([a-z])([A-Z0-9])/g, "$1 $2")
		.replace(/([A-Z])([A-Z0-9])/g, "$1 $2")
		.replace(/([0-9])([a-zA-Z])/g, "$1 $2")
}

export function toCamelCase(str: string) {
	return str.replace(/-([a-zA-Z0-9])/g, (_, $1) => $1.toUpperCase())
}

export function toTitleCase(str: string) {
	const str2 = toCamelCase(str)
	return str2.slice(0, 1).toUpperCase() + str2.slice(1)
}
