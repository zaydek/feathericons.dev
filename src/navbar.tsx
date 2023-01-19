import { manifest } from "./data/react-feather-manifest@4.29.0"
import { Anchor } from "./router"

export function Navbar() {
  return <>
		<nav>
			<Anchor className="px-16 h-32 rounded-1e3 background-color--orange" href="/">
				/
			</Anchor>
			{Object.keys(manifest).slice(0, 6).map(name =>
				<Anchor key={name} className="px-16 h-32 rounded-1e3 background-color--orange" href={`/${name}`}>
					/{name}
				</Anchor>
			)}
		</nav>
  </>
}
