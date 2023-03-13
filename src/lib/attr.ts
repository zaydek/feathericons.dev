export function attr<T>(value: T) {
	if (typeof value === "boolean") {
		return value ? "" : undefined
	} else {
		return value ?? undefined
	}
}
