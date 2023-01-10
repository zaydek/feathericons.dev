import { AnchorHTMLAttributes, createContext, Dispatch, LazyExoticComponent, PropsWithChildren, ReactElement, SetStateAction, useContext, useEffect, useMemo, useState } from "react"

export const PathContext =
	createContext("")
export const SetPathContext =
	createContext<Dispatch<SetStateAction<string>> | null>(null)
//// export const RoutesContext =
//// 	createContext<Record<string, (() => JSX.Element) | LazyExoticComponent<any>>>({})
//// export const SetRoutesContext =
//// 	createContext<Dispatch<SetStateAction<Record<string, (() => JSX.Element) | LazyExoticComponent<any>>>> | null>(null)

// Container component
export function Route({ path: href, component }: { path: string, component: (() => JSX.Element) | LazyExoticComponent<any> }) {
	//// const setRoutes = useContext(SetRoutesContext)!
	////
	//// useEffect(() => {
	//// 	setRoutes(curr => ({
	//// 		...curr,
	//// 		[href]: component,
	//// 	}))
	//// }, [component, href, setRoutes])

	return <></>
}

export function Router({ children }: PropsWithChildren) {
	const path = useContext(PathContext)!

	const Component = useMemo(() => {
		type RouteElement = ReactElement<{ path: string, component: (() => JSX.Element) | LazyExoticComponent<any> }, typeof Route>
		const route = (children as RouteElement[])
			.flat()
			.find(jsx => path === jsx.props.path)
		return route?.props.component ??
			(() => <div>/404</div>) // E.g. fallback
	}, [children, path])

	return <>
		<Component />
	</>
}

export function RouterProvider({ initialPath, children }: PropsWithChildren<{ initialPath: string }>) {
	const [path, setPath] = useState(initialPath)
	//// const [routes, setRoutes] = useState<Record<string, (() => JSX.Element) | LazyExoticComponent<any>>>({})

	useEffect(() => {
		window.addEventListener("popstate", e => {
			setPath(window.location.pathname)
		}, false)
	}, [])

	return <>
		<PathContext.Provider value={path}>
			<SetPathContext.Provider value={setPath}>
				{/* <RoutesContext.Provider value={routes}> */}
					{/* <SetRoutesContext.Provider value={setRoutes}> */}
						{children}
					{/* </SetRoutesContext.Provider> */}
				{/* </RoutesContext.Provider> */}
			</SetPathContext.Provider>
		</PathContext.Provider>
	</>
}

// Make href required
export function Anchor({ href, children, ...props }: { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>) {
	const setPath = useContext(SetPathContext)!

	return <>
		<a href={href} onClick={e => {
			e.preventDefault()
			setPath(href)
			window.history.pushState(null, "", href)
		}} {...props}>
			{children}
		</a>
	</>
}
