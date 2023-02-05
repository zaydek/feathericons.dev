// Converts type T to an array of type T
export type Arrayable<T> = T | T[]

// Removes const from type T
//
// https://github.com/microsoft/TypeScript/issues/24509#issue-327938554
export type Mutable<T> = T & {
	-readonly [P in keyof T]: T[P]
}
