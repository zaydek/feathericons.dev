import { Suspense } from "react"
import { manifest } from "./data/manifest"
import { Home } from "./pages/home"
import { Page } from "./pages/page"
import { Route, Router } from "./router"

export function App({ initialPath }: { initialPath: string }) {
	return <>
		{/* Technically we don't need <Suspense> because we're not lazy loading
		components */}
		<Suspense fallback="Loading...">
			<Router initialPath={initialPath}>
				<Route path="/" component={Home} />
				{manifest.map(name =>
					<Route
						key={name}
						path={`/${name}`}
						component={() => <Page name={name} />}
					/>
				)}
			</Router>
		</Suspense>
	</>
}
