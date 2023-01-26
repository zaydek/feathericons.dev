import { iota } from "./lib/iota"

const WINDOWS_SCROLLBAR_WIDTH = 16

const INSET_X    = 16 // prettier-ignore
const MAIN_WIDTH = 1536 // prettier-ignore

const SM_BREAKPOINT = 1024
const LG_BREAKPOINT = MAIN_WIDTH + INSET_X * 2 + WINDOWS_SCROLLBAR_WIDTH

function NavLink({ pos }: { pos: "tl" | "tr" }) {
	return (
		<div
			className="absolute
				[&[data-pos=tl]]:top-16 [&[data-pos=tl]]:left-16
					[&[data-pos=tr]]:top-16 [&[data-pos=tr]]:right-16"
			data-pos={pos.toLowerCase()}
		>
			<div className="flex h-32 items-center gap-8 rounded-1e3 bg-white/10% px-8 pr-16">
				<div className="h-16 w-16 rounded-1e3 bg-white"></div>
				<div className="h-6 w-96 rounded-1e3 bg-white"></div>
			</div>
		</div>
	)
}

function Logo() {
	return <div className="h-64 w-64 rounded-1e3 bg-white/90%"></div>
}

function LogoSubtext() {
	return (
		<div className="flex flex-col items-center gap-12">
			<div className="h-6 w-128 rounded-1e3 bg-white"></div>
			<div className="h-6 w-256 rounded-1e3 bg-white"></div>
		</div>
	)
}

function CallToActionButton({ primary }: { primary?: boolean }) {
	primary ||= undefined

	return (
		<div
			className="h-56 rounded-[calc(56px_*_0.375)] bg-white/25%
				md:aspect-[3.5] md:rounded-1e3
					[&[data-primary]]:bg-white"
			data-primary={primary}
		></div>
	)
}

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
			<div className="aspect-[3.5] h-48 rounded-1e3 bg-white/25%"></div>
			<div className="h-6 w-96 rounded-1e3 bg-white/90%"></div>
		</div>
	)
}

//// function Breakpoint({ fallback, children, ...props }: PropsWithChildren<({ minWidth: number } | { maxWidth: number }) & { fallback?: boolean }>) {
//// 	fallback ??= false
////
//// 	// Disambiguate props
//// 	let minWidth: number | undefined
//// 	let maxWidth: number | undefined
//// 	if ("minWidth" in props) {
//// 		minWidth = props.minWidth
//// 	} else {
//// 		maxWidth = props.maxWidth
//// 	}
////
//// 	const [matches, setMatches] = useState(fallback)
////
//// 	useEffect(() => {
//// 		if (typeof minWidth === "number" && typeof maxWidth === "undefined") {
//// 			const media = window.matchMedia(`(min-width: ${minWidth}px)`)
//// 			setMatches(media.matches)
//// 			function handleChange(e: MediaQueryListEvent) {
//// 				setMatches(e.matches)
//// 			}
//// 			media.addEventListener("change", handleChange)
//// 			return () => media.removeEventListener("change", handleChange)
//// 		} else if (typeof minWidth === "undefined" && typeof maxWidth === "number") {
//// 			const media = window.matchMedia(`(max-width: ${maxWidth}px)`)
//// 			setMatches(media.matches)
//// 			function handleChange(e: MediaQueryListEvent) {
//// 				setMatches(e.matches)
//// 			}
//// 			media.addEventListener("change", handleChange)
//// 			return () => media.removeEventListener("change", handleChange)
//// 		}
//// 	}, [maxWidth, minWidth])
////
//// 	return <>{matches ? children : null}</>
//// }

//// <Breakpoint maxWidth={1280}>
//// 	<header className="flex flex-col items-center gap-64 bg-[#1570fb] py-64">
//// 		<Logo />
//// 		{/* Placeholders */}
//// 		<div className="flex flex-col items-center gap-12">
//// 			<div className="h-6 w-128 rounded-1e3 bg-white"></div>
//// 			<div className="h-6 w-256 rounded-1e3 bg-white"></div>
//// 		</div>
//// 		<div className="flex gap-16">
//// 			<CTAButton primary />
//// 			<CTAButton />
//// 		</div>
//// 		<div className="flex items-center gap-12">
//// 			<div className="h-6 w-96 rounded-1e3 bg-white"></div>
//// 			{/* TODO */}
//// 			<div className="h-2 w-2 rounded-1e3 bg-white"></div>
//// 			<div className="h-6 w-96 rounded-1e3 bg-white"></div>
//// 		</div>
//// 		<div className="flex flex-wrap justify-center gap-16">
//// 			{iota(5).map(index => (
//// 				<Sponsor key={index} />
//// 			))}
//// 		</div>
//// 	</header>
//// </Breakpoint>

function Header() {
	return (
		<>
			<NavLink pos="tl" />
			<NavLink pos="tr" />
			<header className="flex justify-center bg-[#1570fb] py-96 px-[var(--inset-x)]">
				<div
					className="flex flex-col gap-64
						xl:w-100% xl:max-w-1024 xl:flex-row xl:items-center"
				>
					{/* LHS */}
					<div className="flex grow flex-col items-center gap-32">
						<Logo />
						<LogoSubtext />
						<div
							className="flex w-384 flex-col gap-16
								md:flex-row"
						>
							<CallToActionButton primary />
							<CallToActionButton />
						</div>
					</div>
					{/* RHS */}
					<div
						className="hidden
							md:flex md:flex-col md:items-center md:gap-32
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

function MainFgMask() {
	return (
		<>
			<style jsx>{`
				.main-fg-mask-sticky {
					// POSITION
					position: sticky;
					top: 0;
					z-index: 10;
					// FLEXBOX
					display: flex;
					justify-content: center;
					// MISC
					pointer-events: none;
				}
				.main-fg-mask-sticky + :global(*) {
					position: relative;
					top: calc(-1 * var(--rounding));
				}
				.bit-1 {
					position: relative;
					height: calc(var(--rounding) + var(--inset-y));
					min-width: calc(var(--rounding) + var(--inset-x)); // Use min-width to ensure no shrinking
					background-color: orange;
				}
				.bit-2 {
					height: var(--inset-y);
					width: 100%;
					max-width: calc(1536px - var(--rounding) * 2);
					background-color: yellow;
				}
				.bit-3 {
					position: relative;
					height: calc(var(--rounding) + var(--inset-y));
					min-width: calc(var(--rounding) + var(--inset-x)); // Use min-width to ensure no shrinking
					background-color: orange;
				}
				// Absolutely positioned masks
				.bit-1-mask-absolute {
					position: absolute;
					bottom: 0;
					right: 0;
					height: var(--rounding);
					width: var(--rounding);
					border-top-left-radius: 1e3px;
					background-color: pink;
				}
				.bit-3-mask-absolute {
					position: absolute;
					bottom: 0;
					left: 0;
					height: var(--rounding);
					width: var(--rounding);
					border-top-right-radius: 1e3px;
					background-color: pink;
				}
				// prettier-ignore
				@media (max-width: ${LG_BREAKPOINT}px) {
					.main-fg-mask-sticky + :global(*) { top: 0; }
				}
				// prettier-ignore
				@media (max-width: ${LG_BREAKPOINT}px) {
					* { display: none; }
				}
			`}</style>
			<div className="main-fg-mask-sticky">
				<div className="bit-1">
					<div className="bit-1-mask-absolute"></div>
				</div>
				<div className="bit-2"></div>
				<div className="bit-3">
					<div className="bit-3-mask-absolute"></div>
				</div>
			</div>
		</>
	)
}

function MainBgMask() {
	return (
		<>
			<style jsx>{`
				.main-bg-mask-sticky {
					// POSITION
					position: sticky;
					top: 0;
					// BORDER BOX
					height: 0; // 😎
				}
				.main-bg-mask {
					// BORDER BOX
					margin: 0 -10%;
					height: 320px;
					border-radius: 0 0 100% 100%;
					// BOX DECORATION
					background-color: green;
				}
				// prettier-ignore
				@media (max-width: ${LG_BREAKPOINT}px) {
					* { display: none; }
				}
			`}</style>
			<div className="main-bg-mask-sticky">
				<div className="main-bg-mask"></div>
			</div>
		</>
	)
}

export function SharedApp2() {
	return (
		<>
			<style jsx>{`
				.main-container {
					// FLEXBOX
					display: flex;
					justify-content: center;
					// BORDER BOX
					padding: 0 var(--inset-x);
				}
				.main {
					// FLEXBOX
					display: flex;
					// BORDER BOX
					min-height: calc(100vh - (var(--rounding) + var(--inset-x))); // Fallback
					min-height: calc(100dvh - (var(--rounding) + var(--inset-x)));
					width: 100%;
					max-width: var(--main-width);
					border-radius: var(--rounding);
					// BOX DECORATION
					background-color: var(--white);
					box-shadow: var(--shadow-4);
				}
				.main-col-1 {
					// BORDER BOX
					flex-grow: 1;
				}
				.main-col-2 {
					// BORDER BOX
					width: var(--main-col-2-width);
					// BOX DECORATION
					box-shadow: var(--hairline-shadow-l);
				}
				.main-col-sticky {
					position: sticky;
					top: var(--inset-y);
				}
				// prettier-ignore
				@media (max-width: ${LG_BREAKPOINT}px) {
					.main-container  { padding: 0; }
					.main            { border-radius: 0; }
					.main-col-sticky { top: 0; }
				}
				// prettier-ignore
				@media (max-width: ${SM_BREAKPOINT}px) {
					.main-col-2 { display: none; }
				}
			`}</style>
			<Header />
			<MainBgMask />
			<MainFgMask />
			<div className="main-container">
				<div className="main">
					<main className="main-col-1">
						<div className="main-col-sticky">
							<div>Hello</div>
						</div>
						{iota(32).map(index => (
							<div key={index}>Hello</div>
						))}
					</main>
					<aside className="main-col-2">
						<div className="main-col-sticky">
							<div>Hello</div>
						</div>
						<div>Hello</div>
						<div>Hello</div>
					</aside>
				</div>
			</div>
		</>
	)
}
