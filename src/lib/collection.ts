export function getKeys<T>(setOrMap: Set<T> | Map<T, unknown>, { limit = Infinity }: { limit?: number } = {}) {
	const lazy = setOrMap.keys()
	const keys: T[] = []
	let curr = lazy.next()
	while (!curr.done && keys.length < limit) {
		keys.push(curr.value)
		curr = lazy.next()
	}
	const more = !curr.done
	return { keys, more }
}

export function getValues<T>(setOrMap: Set<T> | Map<unknown, T>, { limit = Infinity }: { limit?: number } = {}) {
	const lazy = setOrMap.values()
	const keys: T[] = []
	let curr = lazy.next()
	while (!curr.done && keys.length < limit) {
		keys.push(curr.value)
		curr = lazy.next()
	}
	const more = !curr.done
	return { keys, more }
}
