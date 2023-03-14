import react from "react"

export type SidebarState = "maximized" | "minimized" | null

// prettier-ignore
export const sidebarContext = react.createContext<{
	sidebar1:    SidebarState
	setSidebar1: react.Dispatch<react.SetStateAction<SidebarState>>
	sidebar2:    SidebarState
	setSidebar2: react.Dispatch<react.SetStateAction<SidebarState>>
} | null>(null)

export function SidebarProvider({ children }: react.PropsWithChildren) {
	const [sidebar1, setSidebar1] = react.useState<SidebarState>(null)
	const [sidebar2, setSidebar2] = react.useState<SidebarState>(null)

	return (
		<sidebarContext.Provider
			value={{
				sidebar1,
				setSidebar1,
				sidebar2,
				setSidebar2,
			}}
		>
			{children}
		</sidebarContext.Provider>
	)
}
