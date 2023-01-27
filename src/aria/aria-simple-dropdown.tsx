// https://w3c.github.io/aria-practices/examples/combobox/combobox-select-only.html

import { createContext, Dispatch, SetStateAction, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import { getStringFromReactElements } from "./utils"

// prettier-ignore
const _SimpleDropDownContext =
	createContext<{
		show:         boolean
		setShow:      Dispatch<SetStateAction<boolean>>
		currentId:    string
		setCurrentId: Dispatch<SetStateAction<string>>
		items:        { id: string, string: string }[]
		setItems:     Dispatch<SetStateAction<{ id: string, string: string }[]>>
		add:          (id: string, string: string) => void
		remove:       (id: string) => void
		decrement:    (by?: number | undefined) => void
		increment:    (by?: number | undefined) => void
	} | null>(null)

// prettier-ignore
type AriaSimpleDropDownProps = {
	show:         boolean
	setShow:      Dispatch<SetStateAction<boolean>>
	currentId:    string
	setCurrentId: Dispatch<SetStateAction<string>>
} & JSX.IntrinsicElements["div"]

export function AriaSimpleDropDown({ show, setShow, currentId, setCurrentId, children, ...props }: AriaSimpleDropDownProps) {
	const ref = useRef<HTMLDivElement | null>(null)
	const [items, setItems] = useState<{ id: string; string: string }[]>([])

	const add = useCallback((id: string, string: string) => {
		setItems(curr => [...curr, { id, string }])
	}, [])

	const remove = useCallback((id: string) => {
		setItems(curr => {
			const index = curr.findIndex(f => f.id === id)
			return [...curr.slice(0, index), ...curr.slice(index + 1)]
		})
	}, [])

	const decrement = useCallback(
		(by: number | undefined = 1) => {
			if (by === -1) {
				setCurrentId(items[0].id)
			} else {
				const index = items.findIndex(f => f.id === currentId)
				setCurrentId(items[Math.max(0, index - by)].id)
			}
		},
		[currentId, items, setCurrentId]
	)

	const increment = useCallback(
		(by: number | undefined = 1) => {
			if (by === -1) {
				setCurrentId(items[items.length - 1].id)
			} else {
				const index = items.findIndex(f => f.id === currentId)
				setCurrentId(items[Math.min(items.length - 1, index + by)].id)
			}
		},
		[currentId, items, setCurrentId]
	)

	// FIXME: Hmm...
	const decrementRef = useRef(decrement)
	const incrementRef = useRef(increment)

	useEffect(() => {
		decrementRef.current = decrement
		incrementRef.current = increment
	}, [decrement, increment])

	useEffect(() => {
		if (items.length === 0) { return } // prettier-ignore
		if (show) {
			// prettier-ignore
			const element = document.getElementById(currentId) ??
				document.getElementById(items[0].id)
			element?.focus()
		} else {
			ref.current!.focus()
		}
	}, [currentId, items, show])

	return (
		// eslint-disable-next-line react/jsx-pascal-case
		<_SimpleDropDownContext.Provider
			value={useMemo(
				() => ({
					show,
					setShow,
					/**/
					currentId,
					setCurrentId,
					/**/
					items,
					setItems,
					/**/
					add,
					remove,
					increment,
					decrement,
				}),
				[add, currentId, decrement, increment, items, remove, setCurrentId, setShow, show]
			)}
		>
			<div
				ref={ref}
				onClick={e => {
					setShow(curr => !curr)
				}}
				onKeyDown={e => {
					if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
						e.preventDefault()
						setShow(true)
					} else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
						e.preventDefault()
						setShow(true)
					}
					if (e.key === " " || e.key === "Enter") {
						e.preventDefault()
						setShow(curr => !curr)
					} else if (e.key === "Home") {
						e.preventDefault()
						setShow(true)
						setTimeout(() => {
							setTimeout(() => {
								decrementRef.current(-1)
							}, 0)
						}, 0)
					} else if (e.key === "End") {
						e.preventDefault()
						setShow(true)
						setTimeout(() => {
							setTimeout(() => {
								incrementRef.current(-1)
							}, 0)
						}, 0)
					}
				}}
				// A11y
				role="combobox"
				aria-controls="listbox1"
				aria-expanded={show}
				tabIndex={0}
				// /A11y
				{...props}
			>
				{children}
			</div>
		</_SimpleDropDownContext.Provider>
	)
}

type AriaSimpleDropDownItemProps = { id: string } & Omit<JSX.IntrinsicElements["div"], "id">

export function AriaSimpleDropDownItem({ id, children, ...props }: AriaSimpleDropDownItemProps) {
	const { setShow, currentId, setCurrentId, add, remove, decrement, increment } = useContext(_SimpleDropDownContext)!

	const ref = useRef<HTMLDivElement | null>(null)
	const string = useMemo(() => getStringFromReactElements(children as any), [children]) // 🤷‍♀️
	const selected = useMemo(() => currentId === id, [currentId, id])

	useEffect(() => {
		add(id, string)
		return () => remove(id)
	}, [add, id, remove, string])

	return (
		<div
			ref={ref}
			id={id}
			onClick={e => {
				e.preventDefault()
				e.stopPropagation()
				setCurrentId(id)
				setShow(false)
			}}
			onKeyDown={e => {
				if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
					e.preventDefault()
					e.stopPropagation()
					decrement()
				} else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
					e.preventDefault()
					e.stopPropagation()
					increment()
				} else if (e.key === " " || e.key === "Enter" || e.key === "Tab") {
					e.preventDefault()
					e.stopPropagation()
					setCurrentId(id)
					setShow(false)
				} else if (e.key === "Home") {
					e.preventDefault()
					e.stopPropagation()
					decrement(-1)
				} else if (e.key === "End") {
					e.preventDefault()
					e.stopPropagation()
					increment(-1)
				}
			}}
			// A11y
			role="option"
			aria-selected={selected}
			tabIndex={0}
			// /A11y
			{...props}
		>
			{children}
		</div>
	)
}
