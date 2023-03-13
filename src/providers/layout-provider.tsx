import react from "react"

export type SidebarState = "minimized" | "open" | "maximized"

// prettier-ignore
export const LayoutContext = react.createContext<{
	sidebar1:    SidebarState
	setSidebar1: react.Dispatch<react.SetStateAction<SidebarState>>
	sidebar2:    SidebarState
	setSidebar2: react.Dispatch<react.SetStateAction<SidebarState>>
} | null>(null)

export function LayoutProvider({ children }: react.PropsWithChildren) {
	const [sidebar1, setSidebar1] = react.useState<SidebarState>("open")
	const [sidebar2, setSidebar2] = react.useState<SidebarState>("open")

	return (
		<LayoutContext.Provider
			value={{
				sidebar1,
				setSidebar1,
				sidebar2,
				setSidebar2,
			}}
		>
			{children}
		</LayoutContext.Provider>
	)
}