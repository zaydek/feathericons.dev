import { Anchor } from "./app";

export function Navbar() {
  return <>
		<nav>
			<Anchor className="px-16 h-32 rounded-1e3 bg-orange" href="/">/</Anchor>
			<Anchor className="px-16 h-32 rounded-1e3 bg-orange" href="/foo">/foo</Anchor>
			<Anchor className="px-16 h-32 rounded-1e3 bg-orange" href="/foo/bar">/foo/bar</Anchor>
		</nav>
  </>
}
