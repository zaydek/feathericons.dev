import { manifest } from "./data/react-feather-manifest"
import { Link, LinkProps } from "./router"

function OrangeLink({ children, ...props }: LinkProps) {
	return (
		<Link className="flex h-24 items-center justify-center rounded-4 bg-[orange] px-12" {...props}>
			{children}
		</Link>
	)
}

export function Navigation() {
	return (
		<div className="p-8">
			<nav className="flex flex-wrap gap-4">
				<OrangeLink href="/">/</OrangeLink>
				{Object.keys(manifest).map(name => (
					<OrangeLink href={`/${name}`}>/{name}</OrangeLink>
				))}
			</nav>
		</div>
	)
}
