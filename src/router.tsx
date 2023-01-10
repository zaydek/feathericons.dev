import { AnchorHTMLAttributes, createContext, Dispatch, LazyExoticComponent, PropsWithChildren, ReactElement, SetStateAction, useContext, useEffect, useMemo, useState } from "react"

export const PathContext =
	createContext("")
export const SetPathContext =
	createContext<Dispatch<SetStateAction<string>> | null>(null)

// Container component
export function Route<ComponentProps extends {}>(_: {
	path:            string
	component:       ((_: ComponentProps) => JSX.Element) | LazyExoticComponent<any>
	componentProps?: ComponentProps
}) {
	return <></>
}

export function Router({ children }: PropsWithChildren) {
	const path = useContext(PathContext)!

	const [Component, componentProps] = useMemo(() => {
		type RouteElement = ReactElement<{ path: string, component: (() => JSX.Element) | LazyExoticComponent<any>, componentProps?: Record<string, any> }, typeof Route>
		const route = (children as RouteElement[])
			.flat()
			.find(jsx => path === jsx.props.path)
		if (route === undefined) {
			return [() => <div>/404</div>, {}] // E.g. fallback
		} else {
			return [route.props.component, route.props.componentProps]
		}
	}, [children, path])

	return <>
		<Component {...componentProps} />
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
