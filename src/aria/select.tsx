import React from "react"

import { useMount } from "@/lib"

// prettier-ignore
export const SelectContext = React.createContext<{
	open:             boolean
	setOpen:          React.Dispatch<React.SetStateAction<boolean>>
	currentValue:     string
	setCurrentValue:  React.Dispatch<React.SetStateAction<string>>
	values:           string[]
	setValues:        React.Dispatch<React.SetStateAction<string[]>>
	decrementToStart: () => void
	decrement:        () => void
	increment:        () => void
	incrementToEnd:   () => void
} | null>(null)

// prettier-ignore
export type SelectProviderProps = React.PropsWithChildren<{
	open:     boolean
	setOpen:  React.Dispatch<React.SetStateAction<boolean>>
	value:    string
	setValue: React.Dispatch<React.SetStateAction<string>>
}>

export function SelectProvider({
	open,
	setOpen,
	// eslint-disable-next-line destructuring/no-rename
	value: currentValue,
	// eslint-disable-next-line destructuring/no-rename
	setValue: setCurrentValue,
	children,
}: SelectProviderProps) {
	const [values, setValues] = React.useState<string[]>([])

	const decrementToStart = React.useCallback(() => {
		setCurrentValue(values[0])
	}, [setCurrentValue, values])

	const decrement = React.useCallback(() => {
		setCurrentValue(curr => {
			const index = values.indexOf(curr)
			if (index === -1) return curr // ¯\_(ツ)_/¯
			return values[(index - 1 + values.length) % values.length]
		})
	}, [setCurrentValue, values])

	const increment = React.useCallback(() => {
		setCurrentValue(curr => {
			const index = values.indexOf(curr)
			if (index === -1) return curr // ¯\_(ツ)_/¯
			return values[(index + 1) % values.length]
		})
	}, [setCurrentValue, values])

	const incrementToEnd = React.useCallback(() => {
		setCurrentValue(values[values.length - 1])
	}, [setCurrentValue, values])

	return (
		<SelectContext.Provider
			value={{
				open,
				setOpen,
				currentValue,
				setCurrentValue,
				values,
				setValues,
				decrementToStart,
				decrement,
				increment,
				incrementToEnd,
			}}
		>
			{children}
		</SelectContext.Provider>
	)
}

//// export type SelectProps = Accessible<JSX.IntrinsicElements["div"]>
export type SelectProps = JSX.IntrinsicElements["div"]

export function Select({ children, ...props }: SelectProps) {
	const ctx = React.useContext(SelectContext)!
	const ref = React.useRef<HTMLDivElement | null>(null)

	React.useEffect(() => {
		if (ctx.open) return
		ref.current!.focus()
	}, [ctx])

	React.useEffect(() => {
		if (!ctx.open) return
		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === "Escape") {
				ctx.setOpen(false)
			}
		}
		window.addEventListener("keydown", handleKeyDown, false)
		return () => window.removeEventListener("keydown", handleKeyDown, false)
	}, [ctx])

	return (
		<div
			{...props}
			ref={ref}
			// A11y
			role="combobox"
			aria-controls="listbox1"
			aria-expanded={ctx.open}
			// /A11y
			onClick={e => {
				ctx.setOpen(curr => !curr)
				// Preserve
				props.onClick?.(e)
			}}
			onKeyDown={e => {
				switch (e.key) {
					case " ":
					case "Enter":
						ctx.setOpen(curr => !curr)
						break
					case "ArrowUp":
						ctx.setOpen(true)
						ctx.decrement()
						break
					case "ArrowDown":
						ctx.setOpen(true)
						ctx.increment()
						break
					case "PageUp":
					case "Home":
						ctx.setOpen(true)
						ctx.decrementToStart()
						break
					case "PageDown":
					case "End":
						ctx.setOpen(true)
						ctx.incrementToEnd()
						break
				}
				// Preserve
				props.onKeyDown?.(e)
			}}
			tabIndex={0}
		>
			{children}
		</div>
	)
}

export type OptionProps = JSX.IntrinsicElements["div"] & { value: string }

export function Option({ value, children, ...props }: OptionProps) {
	const ctx = React.useContext(SelectContext)!
	const ref = React.useRef<HTMLDivElement | null>(null)

	useMount(() => {
		ctx.setValues(curr => [...curr, value])
	})

	React.useEffect(() => {
		if (!ctx.open) return
		if (ctx.currentValue === value) {
			ref.current!.focus()
		}
	}, [ctx.currentValue, ctx.open, value])

	return (
		<div
			{...props}
			ref={ref}
			// A11y
			role="option"
			aria-selected={ctx.currentValue === value}
			// /A11y
			onClick={e => {
				e.stopPropagation()
				ctx.setOpen(false)
				ctx.setCurrentValue(value)
				// Preserve
				props.onClick?.(e)
			}}
			onKeyDown={e => {
				switch (e.key) {
					case " ":
					case "Enter":
						e.stopPropagation()
						ctx.setOpen(false)
						ctx.setCurrentValue(value)
						break
					case "ArrowUp":
						e.stopPropagation()
						ctx.setOpen(true)
						ctx.decrement()
						break
					case "ArrowDown":
						e.stopPropagation()
						ctx.setOpen(true)
						ctx.increment()
						break
					case "PageUp":
					case "Home":
						e.stopPropagation()
						ctx.setOpen(true)
						ctx.decrementToStart()
						break
					case "PageDown":
					case "End":
						e.stopPropagation()
						ctx.setOpen(true)
						ctx.incrementToEnd()
						break
				}
				// Preserve
				props.onKeyDown?.(e)
			}}
			tabIndex={0}
		>
			{children}
		</div>
	)
}
