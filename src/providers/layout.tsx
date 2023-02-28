import { createContext, Dispatch, PropsWithChildren, SetStateAction, useMemo, useState } from "react"

export type SidebarState = null | "minimized" | "maximized"

// prettier-ignore
export const LayoutContext =
	createContext<{
		sidebar1:    SidebarState                           // TODO: DEPRECATE?
		setSidebar1: Dispatch<SetStateAction<SidebarState>> // TODO: DEPRECATE?
		sidebar2:    SidebarState
		setSidebar2: Dispatch<SetStateAction<SidebarState>>
	} | null>(null)

export function LayoutProvider({ children }: PropsWithChildren) {
	const [sidebar1, setSidebar1] = useState<SidebarState>(null)
	const [sidebar2, setSidebar2] = useState<SidebarState>("minimized")

	return (
		<LayoutContext.Provider
			value={useMemo(
				() => ({
					sidebar1,
					setSidebar1,
					sidebar2,
					setSidebar2,
				}),
				[sidebar1, sidebar2],
			)}
		>
			{children}
		</LayoutContext.Provider>
	)
}
