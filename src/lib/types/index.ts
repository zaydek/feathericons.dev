export type Arrayable<T> = T | T[]

// https://github.com/microsoft/TypeScript/issues/24509#issue-327938554
export type Mutable<T> = T & {
	-readonly [P in keyof T]: T[P]
}
