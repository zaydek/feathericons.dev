import { createContext, ReactNode, useCallback, useState } from "react"

// prettier-ignore
const SelectedContext = createContext<{
  selected: Map<string, true>;
  add:      (...ids: string[]) => void;
  remove:   (...ids: string[]) => void;
} | null>(null)

export function ClipboardProvider({ children }: { children: ReactNode }) {
	const [selected, setSelected] = useState<Map<string, true>>(() => new Map())

	const add = useCallback((...ids: string[]) => {
		setSelected(prev => {
			const next = new Map(prev)
			for (const id of ids) {
				next.set(id, true)
			}
			return next
		})
	}, [])

	const remove = useCallback((...ids: string[]) => {
		setSelected(prev => {
			const next = new Map(prev)
			for (const id of ids) {
				next.delete(id)
			}
			return next
		})
	}, [])

	//// useEffect(() => {
	//// 	// TODO
	//// }, [])

	return (
		<SelectedContext.Provider
			value={{
				selected,
				add,
				remove,
			}}
		>
			{children}
		</SelectedContext.Provider>
	)
}
