import { createContext, Dispatch, PropsWithChildren, SetStateAction, useMemo } from "react"
import { useParameterState } from "./use-parameter-state"

export type SidebarState = "normal" | "maximized" | "minimized"

// prettier-ignore
export const LayoutContext =
	createContext<{
		sidebar:    SidebarState
		setSidebar: Dispatch<SetStateAction<SidebarState>>
	} | null>(null)

export function LayoutProvider({ children }: PropsWithChildren) {
	const [sidebar, setSidebar] = useParameterState<SidebarState>({
		key: "sidebar",
		initialValue: "minimized",
		parser: value => {
			if (value === "normal" || value === "maximized" || value === "minimized") {
				return value
			} else {
				return "normal"
			}
		},
	})

	return (
		<LayoutContext.Provider
			value={useMemo(
				() => ({
					sidebar,
					setSidebar,
				}),
				[sidebar, setSidebar],
			)}
		>
			{children}
		</LayoutContext.Provider>
	)
}
