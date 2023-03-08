import { useEffect, useState } from "react"

const searchParams = new URLSearchParams(typeof window === "undefined" ? "" : window.location.search)

export type Parser<T> = (value: string) => T
export type Serializer<T> = (value: T) => string

export function useParam<T>({
	key,
	initialValue,
	parser,
	// @ts-expect-error
	serializer = value => value.toString(),
}: {
	key: string
	initialValue: T
	parser: Parser<T>
	serializer?: Serializer<T>
}) {
	const [value, setValue] = useState(() => {
		const param = searchParams.get(key)
		return param === null ? initialValue : parser(param)
	})

	useEffect(() => {
		const d = window.setTimeout(() => {
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
		return () => clearTimeout(d)
	}, [value]) // eslint-disable-line react-hooks/exhaustive-deps

	return [value, setValue] as const
}

const parser_boolean = (value: string) => value === "1"
const serializer_boolean = (value: boolean) => (value ? "1" : "0")

export function useParamBoolean({ key, initialValue }: { key: string; initialValue: boolean }) {
	return useParam({
		key,
		initialValue,
		parser: parser_boolean,
		serializer: serializer_boolean,
	})
}
