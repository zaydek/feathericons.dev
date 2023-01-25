import Link, { LinkProps } from "next/link"
import { PropsWithChildren } from "react"
import { manifest } from "./data/react-feather-manifest"
import { toKebabCase } from "./lib/cases"
import { IconProps } from "./pages/[icon]"

function OrangeLink({ children, ...props }: PropsWithChildren<LinkProps>) {
	return (
		<Link className="flex h-24 items-center bg-[orange] px-12" {...props}>
			{children}
		</Link>
	)
}

export function SharedApp({ name }: Partial<IconProps>) {
	return (
		<>
			<div className="p-16">
				<nav className="flex flex-wrap gap-4">
					<OrangeLink href="/" aria-label="Navigate to home">
						<div>Home</div>
					</OrangeLink>
					{Object.keys(manifest).map(name => (
						<OrangeLink key={name} href={`/${toKebabCase(name)}`} aria-label={`Navigate to /${toKebabCase(name)}`}>
							<div>{name}</div>
						</OrangeLink>
					))}
				</nav>
			</div>

			{/* Docs */}
			{JSON.stringify({ name }, null, 2)}
			{/* {kebabCase === undefined ? (
				<RouteTransition>
					<SearchApp />
				</RouteTransition>
			) : (
				<Docs name={titleCase as any} />
			)} */}
		</>
	)
}
