import { Anchor } from "./app"
import { manifest } from "./manifest"

export function Navbar() {
  return <>
		<nav>
			<Anchor className="px-16 h-32 rounded-1e3 bg-orange" href="/">
				/
			</Anchor>
			{manifest.map(name =>
				<Anchor key={name} className="px-16 h-32 rounded-1e3 bg-orange" href={`/${name}`}>
					/{name}
				</Anchor>
			)}
		</nav>
  </>
}
