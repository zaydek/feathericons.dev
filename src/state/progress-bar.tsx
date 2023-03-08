import { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from "react"

// prettier-ignore
export const ProgressBarContext = createContext<{
	started:    boolean
	setStarted: Dispatch<SetStateAction<boolean>>
} | null>(null)

export function ProgressBarProvider({ children }: PropsWithChildren) {
	const [started, setStarted] = useState(false)

	return (
		<ProgressBarContext.Provider
			value={{
				started,
				setStarted,
			}}
		>
			{children}
		</ProgressBarContext.Provider>
	)
}
