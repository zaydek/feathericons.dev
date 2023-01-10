import { AnchorHTMLAttributes, createContext, Dispatch, LazyExoticComponent, PropsWithChildren, ReactElement, SetStateAction, useContext, useEffect, useMemo, useState } from "react"

export const PathContext =
	createContext("")
export const SetPathContext =
	createContext<Dispatch<SetStateAction<string>> | null>(null)
export const RoutesContext =
	createContext(new Map<string, (() => JSX.Element) | LazyExoticComponent<any>>())
export const SetRoutesContext =
	createContext<Dispatch<SetStateAction<Map<string, (() => JSX.Element) | LazyExoticComponent<any>>>> | null>(null)

// Container component
export function Route({ path: href, component }: { path: string, component: (() => JSX.Element) | LazyExoticComponent<any> }) {
	const setRoutes = useContext(SetRoutesContext)!

	useEffect(() => {
		setRoutes(curr => curr.set(href, component))
	}, [component, href, setRoutes])

	return <></>
}

export function Router({ initialPath, children }: PropsWithChildren<{ initialPath: string }>) {
	const [path, setPath] = useState(initialPath)
	const [routes, setRoutes] = useState(new Map<string, (() => JSX.Element) | LazyExoticComponent<any>>())

	const Component = useMemo(() => {
		type RouteElement = ReactElement<{ path: string, component: (() => JSX.Element) | LazyExoticComponent<any> }, typeof Route>
		type RouteElementChildren = RouteElement[]

		const jsx = (children as RouteElementChildren)
			.flat()
			.find(route => route.props.path === path)
		return jsx!.props.component // TODO: Add fallback or 404
	}, [children, path])

	return <>
		<PathContext.Provider value={path}>
			<SetPathContext.Provider value={setPath}>
				<RoutesContext.Provider value={routes}>
					<SetRoutesContext.Provider value={setRoutes}>
						<Component />
					</SetRoutesContext.Provider>
				</RoutesContext.Provider>
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
