import { manifest } from "./data/manifest"
import { Anchor } from "./router"

export function Navbar() {
  return <>
		<nav>
			<Anchor className="px-16 h-32 rounded-1e3 bg-[orange]" href="/">
				/
			</Anchor>
			{manifest.slice(0, 6).map(name =>
				<Anchor key={name} className="px-16 h-32 rounded-1e3 bg-[orange]" href={`/${name}`}>
					/{name}
				</Anchor>
			)}
		</nav>
  </>
}
