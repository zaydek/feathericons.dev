import React from "react"

// prettier-ignore
export const ThemeContext = React.createContext<{
	dark:    boolean
	setDark: React.Dispatch<React.SetStateAction<boolean>>
} | null>(null)

export function ThemeProvider({ children }: React.PropsWithChildren) {
	const ref = React.useRef(window.matchMedia("(prefers-color-scheme: dark)"))
	const [dark, setDark] = React.useState(ref.current.matches)

	React.useEffect(() => {
		function handleDarkMode(e: MediaQueryListEvent) {
			setDark(e.matches)
		}
		ref.current.addEventListener("change", handleDarkMode, false)
		// eslint-disable-next-line react-hooks/exhaustive-deps
		return () => ref.current.removeEventListener("change", handleDarkMode, false)
	}, [])

	React.useEffect(() => {
		document.documentElement.setAttribute("data-theme", dark ? "dark" : "light")
	}, [dark])

	return (
		<ThemeContext.Provider
			value={{
				dark,
				setDark,
			}}
		>
			{children}
		</ThemeContext.Provider>
	)
}
