import react from "react"

// prettier-ignore
export const ProgressBarContext = react.createContext<{
	started:    boolean
	setStarted: react.Dispatch<react.SetStateAction<boolean>>
} | null>(null)

export function ProgressBarProvider({ children }: react.PropsWithChildren) {
	const [started, setStarted] = react.useState(false)

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
