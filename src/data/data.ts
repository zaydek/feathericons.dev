import { toKebabCase } from "../lib/cases"
import { manifest } from "./react-feather-manifest"

export const data = {
	...Object.keys(manifest).reduce<{ [key: string]: { data: string } }>((acc, name) => {
		acc[toKebabCase(name)] = { data: name }
		return acc
	}, {})
}

export const dataKeys = Object.keys(data)
