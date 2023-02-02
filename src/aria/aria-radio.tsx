import { createContext, Dispatch, HTMLAttributes, SetStateAction, useContext, useEffect, useMemo, useRef, useState } from "react"

// prettier-ignore
const InternalRadiogroupContext = createContext<{
	groupValue:    string
	setGroupValue: Dispatch<SetStateAction<string>>
	values:        string[]
	setValues:     Dispatch<SetStateAction<string[]>>
} | null>(null)

// prettier-ignore
export type AriaRadiogroupProps = {
	groupValue:    string
	setGroupValue: Dispatch<SetStateAction<string>>
} & HTMLAttributes<HTMLDivElement>

export function AriaRadiogroup({ groupValue, setGroupValue, children, ...props }: AriaRadiogroupProps) {
	const [values, setValues] = useState<string[]>([])

	return (
		<InternalRadiogroupContext.Provider
			value={useMemo(
				() => ({
					groupValue,
					setGroupValue,
					/**/
					values,
					setValues,
				}),
				[groupValue, setGroupValue, values]
			)}
		>
			<div
				// A11y
				role="radiogroup"
				// /A11y
				{...props}
			>
				{children}
			</div>
		</InternalRadiogroupContext.Provider>
	)
}

export type AriaRadioProps = {
	value: string
} & HTMLAttributes<HTMLDivElement>

export function AriaRadio({ value, children, ...props }: AriaRadioProps) {
	const { groupValue, setGroupValue, values, setValues } = useContext(InternalRadiogroupContext)!

	const ref = useRef<HTMLDivElement | null>(null)
	const checked = useMemo(() => groupValue === value, [groupValue, value])

	useEffect(() => {
		setValues(curr => [...curr, value])
		return () => {
			setValues(curr => {
				const index = curr.indexOf(value)
				return [...curr.slice(0, index), ...curr.slice(index + 1)]
			})
		}
	}, [setValues, value])

	// NOTE: In dev mode, <StrictMode> calls this effect twice therefore focusing
	// ref.current
	const onceRef = useRef(false)
	useEffect(() => {
		if (!onceRef.current) {
			onceRef.current = true
			return
		}
		if (ref.current === null) { return } // prettier-ignore
		if (checked) {
			ref.current.focus()
		}
	}, [checked])

	return (
		<div
			ref={ref}
			onClick={e => {
				e.preventDefault()
				setGroupValue(value)
				// Preserve props events
				props.onClick?.(e)
			}}
			onKeyDown={e => {
				if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
					e.preventDefault()
					const nextValue = values.indexOf(value) - 1
					if (nextValue < 0) {
						setGroupValue(values[values.length - 1])
					} else {
						setGroupValue(values[nextValue])
					}
				} else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
					e.preventDefault()
					const nextValue = values.indexOf(value) + 1
					if (nextValue === values.length) {
						setGroupValue(values[0])
					} else {
						setGroupValue(values[nextValue])
					}
				}
				// Preserve props events
				props.onKeyDown?.(e)
			}}
			// A11y
			role="radio"
			aria-checked={checked}
			tabIndex={checked ? 0 : -1}
			// /A11y
			{...props}
		>
			{children}
		</div>
	)
}
