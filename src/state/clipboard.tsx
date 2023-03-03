import { createContext, ReactNode, useCallback, useState } from "react"

// prettier-ignore
export type Format =
	| "svg"
	| "react"
	| "ts-react"
	| "react-native"
	| "ts-react-native"
	| "jpg"
	| "png"

// prettier-ignore
const SelectedContext = createContext<{
	format:         Format
	setFormat:      (format: Format) => void
  selected:       Map<string, true>
  addSelected:    (...ids: string[]) => void
  removeSelected: (...ids: string[]) => void
} | null>(null)

export function ClipboardProvider({ children }: { children: ReactNode }) {
	const [format, setFormat] = useState<Format>("svg")
	const [selected, setSelected] = useState<Map<string, true>>(() => new Map())

	const addSelected = useCallback((...ids: string[]) => {
		setSelected(prev => {
			const next = new Map(prev)
			for (const id of ids) {
				next.set(id, true)
			}
			return next
		})
	}, [])

	const removeSelected = useCallback((...ids: string[]) => {
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
				format,
				setFormat,
				selected,
				addSelected,
				removeSelected,
			}}
		>
			{children}
		</SelectedContext.Provider>
	)
}
