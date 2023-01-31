import { iota } from "../lib/iota"

function NavLink({ pos }: { pos: "tl" | "tr" }) {
	return (
		<div
			className="absolute
				[&[data-pos=tl]]:top-16 [&[data-pos=tl]]:left-16
				[&[data-pos=tr]]:top-16 [&[data-pos=tr]]:right-16"
			data-pos={pos}
		>
			<div className="flex h-32 items-center gap-8 rounded-1e3 bg-black/25 px-8 pr-16">
				<div className="h-16 w-16 rounded-1e3 bg-white"></div>
				<div className="h-6 w-96 rounded-1e3 bg-white"></div>
			</div>
		</div>
	)
}

function Logo() {
	return <div className="h-64 w-64 rounded-1e3 bg-white"></div>
}

function HeadingSubheading() {
	return (
		<div className="flex flex-col items-center">
			<div className="flex h-16 items-center">
				<div className="aspect-[16] h-6 rounded-1e3 bg-white"></div>
			</div>
			<div className="flex h-16 items-center">
				<div className="aspect-[32] h-6 rounded-1e3 bg-white"></div>
			</div>
		</div>
	)
}

function CTAButton({ primary = undefined }: { primary?: true }) {
	return (
		<div
			className="h-64 w-100% max-w-[calc(64px_*_6)] rounded-[calc(64px_*_0.375)] bg-[#fff7] sm:aspect-[3] sm:rounded-1e3
				[&[data-primary]]:bg-white"
			data-primary={primary}
		></div>
	)
}

function SponsorMeta() {
	return (
		<div className="flex items-center gap-16">
			{/* LHS */}
			<div className="flex h-16 items-center">
				<div className="aspect-[16] h-6 rounded-1e3 bg-white"></div>
			</div>
			{/* RHS */}
			<div className="h-3 w-3 rounded-1e3 bg-white"></div>
			<div className="flex h-16 items-center">
				<div className="aspect-[16] h-6 rounded-1e3 bg-white"></div>
			</div>
		</div>
	)
}

function SponsorSlot() {
	return (
		<div className="flex flex-col gap-8">
			<div className="aspect-[3] h-48 rounded-1e3 bg-white"></div>
			<div className="flex h-16 items-center justify-center">
				<div className="aspect-[16] h-6 rounded-1e3 bg-white"></div>
			</div>
		</div>
	)
}

export function Header() {
	return (
		<header
			// prettier-ignore
			className="flex justify-center py-64 pt-96 px-16 sm:py-96"
			data-background-hero
		>
			<NavLink pos="tl" />
			<NavLink pos="tr" />
			<div className="flex w-100% max-w-[var(--header-w)] flex-col justify-evenly gap-64 sm:items-center xl:flex-row">
				{/* LHS */}
				<div className="flex flex-col items-center gap-32">
					<Logo />
					<HeadingSubheading />
					{/* Use items-center ... self-stretch to conditionally center y-axis */}
					<div className="flex flex-col items-center gap-16 self-stretch sm:flex-row sm:self-start">
						<CTAButton primary />
						<CTAButton />
					</div>
				</div>
				{/* RHS */}
				<div className="hidden flex-col items-center gap-16 sm:flex xl:w-100% xl:max-w-512">
					<SponsorMeta />
					<div className="flex flex-wrap justify-center gap-16">
						{iota(5).map(index => (
							<SponsorSlot key={index} />
						))}
					</div>
				</div>
			</div>
		</header>
	)
}
