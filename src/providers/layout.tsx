import React from "react"

export type SidebarState = "minimized" | "open" | "maximized"

// prettier-ignore
export const LayoutContext = React.createContext<{
	sidebar1:    SidebarState
	setSidebar1: React.Dispatch<React.SetStateAction<SidebarState>>
	sidebar2:    SidebarState
	setSidebar2: React.Dispatch<React.SetStateAction<SidebarState>>
} | null>(null)

export function LayoutProvider({ children }: React.PropsWithChildren) {
	const [sidebar1, setSidebar1] = React.useState<SidebarState>("open")
	const [sidebar2, setSidebar2] = React.useState<SidebarState>("open")

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
