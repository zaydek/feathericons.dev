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
const SelectedContext =
	createContext<{
		format:         Format
		setFormat:      (format: Format) => void
		selection:      Map<string, true>
		addToSelection: (...ids: string[]) => void
		clearSelection: () => void
	} | null>(null)

export function ClipboardProvider({ children }: { children: ReactNode }) {
	const [format, setFormat] = useState<Format>("svg")
	const [selection, setSelection] = useState<Map<string, true>>(() => new Map())

	const addToSelection = useCallback((...ids: string[]) => {
		setSelection(prev => {
			const next = new Map(prev)
			for (const id of ids) {
				next.set(id, true)
			}
			return next
		})
	}, [])

	const clearSelection = useCallback(() => {
		setSelection(new Map())
	}, [])

	return (
		<SelectedContext.Provider
			value={{
				format,
				setFormat,
				selection,
				addToSelection,
				clearSelection,
			}}
		>
			{children}
		</SelectedContext.Provider>
	)
}
