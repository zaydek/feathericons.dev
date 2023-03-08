export function getKeys<T>(setOrMap: Set<T> | Map<T, unknown>, { limit = Infinity }: { limit?: number } = {}) {
	const lazy = setOrMap.keys()
	const keys: T[] = []
	for (let index = 0; index < limit; index++) {
		const key = lazy.next().value
		if (key.done) break
		keys.push(key.value)
	}
	const hasMore = !lazy.next().done
	return [keys, hasMore] as const
}

export function getValues<T>(setOrMap: Set<T> | Map<T, unknown>, { limit = Infinity }: { limit?: number } = {}) {
	const lazy = setOrMap.values()
	const keys: T[] = []
	for (let index = 0; index < limit; index++) {
		const key = lazy.next().value
		if (key.done) break
		keys.push(key.value)
	}
	const hasMore = !lazy.next().done
	return [keys, hasMore] as const
}
