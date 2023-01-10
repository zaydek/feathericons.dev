import { AnchorHTMLAttributes, createContext, Dispatch, LazyExoticComponent, PropsWithChildren, ReactElement, SetStateAction, useContext, useEffect, useMemo, useState } from "react"

export const PathContext =
	createContext("")
export const SetPathContext =
	createContext<Dispatch<SetStateAction<string>> | null>(null)

// Container component
export function Route(_: { path: string, component: (() => JSX.Element) | LazyExoticComponent<any> }) {
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

	useEffect(() => {
		window.addEventListener("popstate", e => {
			setPath(window.location.pathname)
		}, false)
	}, [])

	return <>
		<PathContext.Provider value={path}>
			<SetPathContext.Provider value={setPath}>
				{children}
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
