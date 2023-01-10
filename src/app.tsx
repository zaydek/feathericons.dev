import { manifest } from "./data/manifest"
import { Home } from "./pages/home"
import { Page } from "./pages/page"
import { Route, Router, RouterProvider } from "./router"
import { TransitionProvider } from "./transition"

export function App({ initialPath }: { initialPath: string }) {
	return <>
		<RouterProvider initialPath={initialPath}>
			<TransitionProvider>
				<Router>
					<Route path="/" component={Home} />
					{manifest.map(name =>
						<Route
							key={name}
							path={`/${name}`}
							component={() => <Page name={name} />}
						/>
					)}
				</Router>
			</TransitionProvider>
		</RouterProvider>
	</>
}
