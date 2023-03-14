import React from "react"

// prettier-ignore
export const ProgressBarContext = React.createContext<{
	started:    boolean
	setStarted: React.Dispatch<React.SetStateAction<boolean>>
} | null>(null)

export function ProgressBarProvider({ children }: React.PropsWithChildren) {
	const [started, setStarted] = React.useState(false)

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
