export function getKeys<T>(setOrMap: Set<T> | Map<T, unknown>, { limit = Infinity }: { limit?: number } = {}) {
	const lazy = setOrMap.keys()
	const arr: T[] = []
	let curr = lazy.next()
	while (!curr.done && arr.length < limit) {
		arr.push(curr.value)
		curr = lazy.next()
	}
	const hasMore = !curr.done
	return [arr, hasMore] as const
}

export function getValues<T>(setOrMap: Set<T> | Map<unknown, T>, { limit = Infinity }: { limit?: number } = {}) {
	const lazy = setOrMap.values()
	const arr: T[] = []
	let curr = lazy.next()
	while (!curr.done && arr.length < limit) {
		arr.push(curr.value)
		curr = lazy.next()
	}
	const hasMore = !curr.done
	return [arr, hasMore] as const
}
