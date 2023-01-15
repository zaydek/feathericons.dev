import { manifest } from "./data/react-feather-manifest@4.29.0"
import { Home } from "./pages/home-backup"
import { Page } from "./pages/page"
import { Route, Router, RouterProvider } from "./router"
import { TransitionProvider } from "./transition"

export function App({ initialPath }: { initialPath: string }) {
	return <>
		<RouterProvider initialPath={initialPath}>
			<TransitionProvider>
				<Router>
					<Route path="/" component={Home} />
					{Object.keys(manifest).map(name =>
						<Route
							key={name}
							path={`/${name}`}
							component={Page}
							componentProps={{ name: name }}
						/>
					)}
				</Router>
			</TransitionProvider>
		</RouterProvider>
	</>
}
