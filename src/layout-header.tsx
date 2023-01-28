import { iota } from "./lib/iota"

function NavLink({ pos }: { pos: "tl" | "tr" }) {
	return (
		<div
			className="absolute
				[&[data-pos=tl]]:top-16 [&[data-pos=tl]]:left-16
					[&[data-pos=tr]]:top-16 [&[data-pos=tr]]:right-16"
			data-pos={pos.toLowerCase()}
		>
			<div className="flex h-32 items-center gap-8 rounded-1e3 bg-black/25 px-8 pr-16">
				<div className="h-16 w-16 rounded-1e3 bg-white"></div>
				<div className="h-6 w-96 rounded-1e3 bg-white"></div>
			</div>
		</div>
	)
}

////////////////////////////////////////////////////////////////////////////////

function Logo() {
	return <div className="h-64 w-64 rounded-1e3 bg-white/90"></div>
}

function HeadingSubheading() {
	return (
		<div className="flex flex-col items-center gap-12">
			<div className="h-6 w-128 rounded-1e3 bg-white"></div>
			<div className="h-6 w-256 rounded-1e3 bg-white"></div>
		</div>
	)
}

function CTAButton({ primary }: { primary?: boolean }) {
	primary ||= undefined

	return (
		<div
			className="h-56 rounded-[calc(56px_*_0.375)] bg-white/50 sm:aspect-[3.5] sm:rounded-1e3
				[&[data-primary]]:bg-white"
			data-primary={primary}
		></div>
	)
}

////////////////////////////////////////////////////////////////////////////////

function Middot() {
	return <div className="h-2 w-2 rounded-1e3 bg-white"></div>
}

function SponsorMeta() {
	return (
		<div className="flex items-center gap-12">
			<div className="h-6 w-96 rounded-1e3 bg-white"></div>
			<Middot />
			<div className="h-6 w-96 rounded-1e3 bg-white"></div>
		</div>
	)
}

function Sponsor() {
	return (
		<div className="flex flex-col items-center gap-12">
			<div className="aspect-[3.5] h-48 rounded-1e3 bg-white/25"></div>
			<div className="h-6 w-96 rounded-1e3 bg-white/90"></div>
		</div>
	)
}

////////////////////////////////////////////////////////////////////////////////

export function Header() {
	return (
		<>
			<NavLink pos="tl" />
			<NavLink pos="tr" />
			<header className="flex justify-center py-96 px-[var(--inset-x)]" data-bg-hero>
				<div
					className="flex flex-col gap-64
						xl:w-100% xl:max-w-1280 xl:flex-row xl:items-center"
				>
					{/* LHS */}
					<div className="flex grow flex-col items-center gap-32">
						<Logo />
						<HeadingSubheading />
						<div
							className="flex w-384 flex-col gap-12
								sm:flex-row sm:gap-16"
						>
							<CTAButton primary />
							<CTAButton />
						</div>
					</div>
					{/* RHS */}
					<div
						className="hidden
							sm:flex sm:flex-col sm:items-center sm:gap-32
								xl:w-100% xl:max-w-640"
					>
						<SponsorMeta />
						<div className="flex flex-wrap justify-center gap-16">
							{iota(5).map(index => (
								<Sponsor key={index} />
							))}
						</div>
					</div>
				</div>
			</header>
		</>
	)
}
