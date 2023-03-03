import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react"

// prettier-ignore
const SelectedContext = createContext<{
	selected:    string[]
	setSelected: Dispatch<SetStateAction<string[]>>
} | null>(null)

export function ClipboardProvider({ children }: { children: ReactNode }) {
	const [selected, setSelected] = useState<string[]>([])

	//// // TODO: Can we safely use useEffect for clipboard events?
	//// useEffect(() => {
	//// 	// ...
	//// }, [])

	return (
		<SelectedContext.Provider
			value={{
				selected,
				setSelected,
			}}
		>
			{children}
		</SelectedContext.Provider>
	)
}
