// https://w3c.github.io/aria-practices/examples/combobox/combobox-select-only.html

import { createContext, Dispatch, SetStateAction, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import { v4 as uuid } from "uuid"

// prettier-ignore
const _SimpleDropDownContext =
	createContext<{
		currentId:    string
		setCurrentId: Dispatch<SetStateAction<string>>
		ids:          string[]
		setIds:       Dispatch<SetStateAction<string[]>>
		open:         boolean
		setOpen:      Dispatch<SetStateAction<boolean>>
		add:          (id: string) => void
		remove:       (id: string) => void
		decrement:    (by?: number | undefined) => void
		increment:    (by?: number | undefined) => void
	} | null>(null)

export function AriaSimpleDropDown({ children, ...props }: JSX.IntrinsicElements["div"]) {
	const [currentId, setCurrentId] = useState("")
	const [ids, setIds] = useState<string[]>([])
	const [open, setOpen] = useState(false)

	const add = useCallback((id: string) => {
		setIds(curr => [...curr, id])
	}, [])

	const remove = useCallback((id: string) => {
		setIds(curr => {
			const index = curr.indexOf(id)
			return [...curr.slice(0, index), ...curr.slice(index + 1)]
		})
	}, [])

	const decrement = useCallback(
		(by: number | undefined = 1) => {
			if (by === -1) {
				setCurrentId(ids[0])
			} else {
				const index = ids.indexOf(currentId)
				setCurrentId(ids[Math.max(0, index - by)])
			}
		},
		[currentId, ids]
	)

	const increment = useCallback(
		(by: number | undefined = 1) => {
			if (by === -1) {
				setCurrentId(ids[ids.length - 1])
			} else {
				const index = ids.indexOf(currentId)
				setCurrentId(ids[Math.min(ids.length - 1, index + by)])
			}
		},
		[currentId, ids]
	)

	return (
		// eslint-disable-next-line react/jsx-pascal-case
		<_SimpleDropDownContext.Provider
			value={useMemo(
				() => ({
					currentId,
					setCurrentId,
					ids,
					setIds,
					open,
					setOpen,
					add,
					remove,
					increment,
					decrement,
				}),
				[add, currentId, decrement, ids, increment, open, remove]
			)}
		>
			<div
				onClick={e => {
					setOpen(curr => !curr)
				}}
				onKeyDown={e => {
					if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
						e.preventDefault()
						setOpen(true)
					} else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
						e.preventDefault()
						setOpen(true)
					}
					if (e.key === " " || e.key === "Enter") {
						e.preventDefault()
						setOpen(curr => !curr)
					} else if (e.key === "Home") {
						e.preventDefault()
						setOpen(true)
						setCurrentId(ids[0])
					} else if (e.key === "End") {
						e.preventDefault()
						setOpen(true)
						setCurrentId(ids[ids.length - 1])
					}
				}}
				// A11y
				role="combobox"
				aria-controls="listbox1"
				aria-expanded={open}
				tabIndex={0}
				// /A11y
				{...props}
			>
				{children}
			</div>
		</_SimpleDropDownContext.Provider>
	)
}

export function AriaSimpleDropDownItem({ children, ...props }: JSX.IntrinsicElements["div"]) {
	const { currentId, setCurrentId, setOpen, add, remove, decrement, increment } = useContext(_SimpleDropDownContext)!

	const ref = useRef<HTMLDivElement | null>(null)
	const [id] = useState(() => uuid())
	const selected = useMemo(() => currentId === id, [currentId, id])

	// TODO: Change to useLayoutEffect?
	useEffect(() => {
		add(id)
		return () => remove(id)
	}, [add, id, remove])

	//// const onceRef = useRef(false)
	useEffect(() => {
		////if (!onceRef.current) {
		////	onceRef.current = true
		////	return
		////}
		if (ref.current === null) { return } // prettier-ignore
		if (selected) {
			ref.current.focus()
		}
	}, [selected])

	return (
		<div
			ref={ref}
			id={id}
			onClick={e => {
				e.preventDefault()
				setCurrentId(id)
				setOpen(false)
			}}
			onKeyDown={e => {
				if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
					e.preventDefault()
					decrement()
				} else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
					e.preventDefault()
					increment()
				} else if (e.key === " " || e.key === "Enter" || e.key === "Tab") {
					e.preventDefault()
					setCurrentId(id)
					setOpen(false)
				} else if (e.key === "Home") {
					e.preventDefault()
					decrement(-1)
				} else if (e.key === "End") {
					e.preventDefault()
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
