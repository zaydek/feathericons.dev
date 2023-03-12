import { useParam } from "@/lib"
import { createContext, Dispatch, PropsWithChildren, SetStateAction } from "react"

export type SidebarState = "minimized" | "open" | "maximized"

// prettier-ignore
export const LayoutContext = createContext<{
	//// sidebar1:    SidebarState
	//// setSidebar1: Dispatch<SetStateAction<SidebarState>>
	sidebar2:    SidebarState
	setSidebar2: Dispatch<SetStateAction<SidebarState>>
} | null>(null)

function parser_sidebarState(value: string) {
	if (value === "minimized" || value === "open" || value === "maximized") {
		return value
	} else {
		return "open"
	}
}

export function LayoutProvider({ children }: PropsWithChildren) {
	//// const [sidebar1, setSidebar1] = useParam<SidebarState>({
	//// 	key: "sidebar-1",
	//// 	initialValue: "open",
	//// 	parser: parser_sidebarState,
	//// })
	const [sidebar2, setSidebar2] = useParam<SidebarState>({
		key: "sidebar-2",
		initialValue: "open",
		parser: parser_sidebarState,
	})

	return (
		<LayoutContext.Provider
			value={{
				//// sidebar1,
				//// setSidebar1,
				sidebar2,
				setSidebar2,
			}}
		>
			{children}
		</LayoutContext.Provider>
	)
}
