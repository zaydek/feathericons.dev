import { iota } from "./lib/iota"

const WINDOWS_SCROLLBAR_WIDTH = 16

const INSET_X    = 16 // prettier-ignore
const MAIN_WIDTH = 1536 // prettier-ignore

const SM_BREAKPOINT = 1024
const LG_BREAKPOINT = MAIN_WIDTH + INSET_X * 2 + WINDOWS_SCROLLBAR_WIDTH

function ExternalLink({ pos }: { pos: "start" | "end" }) {
	return (
		<>
			<style jsx>{`
				.ext-link {
					// POSITION
					position: absolute;
					${pos === "start"
						? // prettier-ignore
						  `top: var(--inset-y); left:  var(--inset-x);`
						: `top: var(--inset-y); right: var(--inset-x);`}
					// FLEXBOX
					display: flex;
					align-items: center;
					gap: 8px;
					// BORDER BOX
					padding: 0 8px;
					padding-right: 16px; // Override
					height: 32px;
					border-radius: 1e3px;
					// BOX DECORATION
					background-color: hsl(var(--black-raw), 0.1);
				}
				.placeholder-icon {
					height: 16px;
					width: 16px;
					border-radius: 1e3px;
					background-color: var(--white);
				}
				.placeholder-text {
					height: 6px;
					width: 96px;
					border-radius: 1e3px;
					background-color: var(--white);
				}
			`}</style>
			<div className="ext-link">
				<div className="placeholder-icon"></div>
				<div className="placeholder-text"></div>
			</div>
		</>
	)
}

function SponsorContents() {
	return (
		<>
			<style jsx>{`
				.sponsors-container {
					display: flex;
					justify-content: center;
					gap: 16px;
					flex-wrap: wrap;
				}
				.sponsor {
					// BORDER BOX
					height: 48px;
					width: 160px;
					border-radius: 1e3px;
					// BOX DECORATION
					background-color: hsl(var(--white-raw), 10%);
				}
			`}</style>
			<div className="sponsors-container">
				{iota(5).map(index => (
					<div key={index} className="sponsor"></div>
				))}
			</div>
		</>
	)
}

function Header() {
	return (
		<>
			<style jsx>{`
				.header-container {
					// FLEXBOX
					display: flex;
					justify-content: center;
					gap: 32px;
					// BORDER BOX
					padding: 64px 0;
					// BOX DECORATION
					background-color: var(--blue-500);
				}
				.header {
					// FLEXBOX
					display: flex;
					align-items: center;
					// BORDER BOX
					width: 100%;
					max-width: 1024px;
				}
				.header-col-1 {
					// BORDER BOX
					flex-grow: 1;
				}
				.header-col-2 {
					// BORDER BOX
					width: 640px;
				}
				// prettier-ignore
				@media (max-width: ${SM_BREAKPOINT}px) {
					* { display: none; }
				}
			`}</style>
			<header className="header-container">
				<ExternalLink pos="start" />
				<ExternalLink pos="end" />
				<div className="header">
					<div className="header-col-1">Hello</div>
					<div className="header-col-2">
						<SponsorContents />
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
