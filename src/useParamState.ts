import { useEffect, useState } from "react"

const searchParams = new URLSearchParams(typeof window === "undefined" ? "" : window.location.search)

type Parser<T> = (value: string) => T
type Serializer<T> = (value: T) => string

export function useParamState<T>({
	key,
	initialValue,
	parser = value => value as unknown as T,
	// @ts-expect-error
	serializer = value => value.toString(),
}: {
	key: string
	initialValue: T
	parser?: Parser<T>
	serializer?: Serializer<T>
}) {
	const [value, setValue] = useState(() => {
		const param = searchParams.get(key)
		return param === null ? initialValue : parser(param)
	})

	useEffect(() => {
		const timeoutId = window.setTimeout(() => {
			const nextSearchParams = new URLSearchParams(window.location.search)
			if (value === initialValue) {
				nextSearchParams.delete(key)
			} else {
				nextSearchParams.set(key, serializer(value))
			}
			nextSearchParams.sort()
			const str = nextSearchParams.toString()
			if (str === "") {
				window.history.replaceState(null, "", "/")
			} else {
				window.history.replaceState(null, "", `?${str}`)
			}
		}, 100)
		return () => clearTimeout(timeoutId)
	}, [value]) // eslint-disable-line react-hooks/exhaustive-deps

	return [value, setValue] as const
}
