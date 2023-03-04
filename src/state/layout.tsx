import { createContext, Dispatch, PropsWithChildren, SetStateAction } from "react"
import { useParam } from "../hooks/use-param"

export type SidebarState = "minimized" | "open" | "maximized"

// prettier-ignore
export const LayoutContext =
	createContext<{
		sidebar:    SidebarState
		setSidebar: Dispatch<SetStateAction<SidebarState>>
	} | null>(null)

export function LayoutProvider({ children }: PropsWithChildren) {
	const [sidebar, setSidebar] = useParam<SidebarState>({
		key: "sidebar",
		initialValue: "open",
		parser: value => {
			if (value === "minimized" || value === "open" || value === "maximized") {
				return value
			} else {
				return "open"
			}
		},
	})

	return (
		<LayoutContext.Provider
			value={{
				sidebar,
				setSidebar,
			}}
		>
			{children}
		</LayoutContext.Provider>
	)
}
