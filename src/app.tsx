import * as feather from "@icons/feather"
import * as wkPayment from "@icons/wolf-kit/payment"
import * as wkSocial from "@icons/wolf-kit/social-media"

import { isMac, toKebabCase } from "@/lib"
import { Clone } from "@/lib/clone"
import { Icon } from "@/lib/icon"
import { useEffect, useRef, useState } from "react"

function toNameCase(str: string) {
	return toKebabCase(str).toLowerCase()
}

const featherEntries: [string, Icon][] = Object.entries(feather).map(([k, v]) => [toNameCase(k), v])
const wkSocialMediaEntries: [string, Icon][] = Object.entries(wkSocial).map(([k, v]) => [toNameCase(k), v])
const wkPaymentProcessorsEntries: [string, Icon][] = Object.entries(wkPayment).map(([k, v]) => [toNameCase(k), v])

const entries = [...featherEntries, ...wkSocialMediaEntries, ...wkPaymentProcessorsEntries]

function DebugCss() {
	const [showOutline, setShowOutline] = useState(false)

	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === "`") {
				setShowOutline(curr => !curr)
			}
		}
		window.addEventListener("keydown", handleKeyDown, false)
		return () => window.removeEventListener("keydown", handleKeyDown, false)
	}, [])

	return <>{showOutline && <style>{`*:not(svg *) { outline: 1px solid hsl(0, 100%, 50%, 0.125); }`}</style>}</>
}

//// function Checkbox2() {
//// 	const [checked, setChecked] = useState(Math.random() >= 0.5)
////
//// 	return <input type="checkbox" checked={checked} onChange={e => setChecked(curr => !curr)} />
//// }

function CheckboxItem({ name, icon: Icon, showCheckbox = true }: { name: string; icon: Icon; showCheckbox?: boolean }) {
	const ref = useRef<HTMLDivElement | null>(null)

	const [checked, setChecked] = useState(false)

	return (
		<Clone<"li">
			onClick={e => {
				setChecked(curr => !curr)
			}}
			onKeyDown={e => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault()
					setChecked(curr => !curr)
				}
			}}
			aria-checked={checked}
		>
			<li className="checkbox-item">
				<Icon className="icon" />
				<div className="name u-flex-1">{name}</div>
				{showCheckbox && <div ref={ref} className="interactive-checkbox" tabIndex={0} aria-checked={checked}></div>}
			</li>
		</Clone>
	)
}

function ExtAnchor({ name, icon: Icon }: { name: string; icon: Icon }) {
	return (
		<a className="ext-anchor" href="TODO" target="_blank">
			<Icon className="icon-1" />
			<div className="name u-flex-1">{name}</div>
			<feather.ArrowUpRight className="icon-2" strokeWidth={4} />
		</a>
	)
}

export function App() {
	const ref = useRef<HTMLInputElement | null>(null)
	const [value, setValue] = useState("")

	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if ((isMac() ? e.metaKey : e.ctrlKey) && e.key === "p") {
				e.preventDefault() // Sorry printers
				ref.current!.focus()
			}
		}
		window.addEventListener("keydown", handleKeyDown, false)
		return () => window.removeEventListener("keydown", handleKeyDown, false)
	}, [])

	return (
		<>
			<DebugCss />
			<aside className="column-1">
				{/* <header className="section is-start">
					<div className="search-bar">
						<feather.Search className="icon" strokeWidth={4} />
						<input
							className="u-flex-1"
							ref={ref}
							type="text"
							placeholder={isMac() ? "Press ⌘P to focus" : "Press Ctrl+P to focus"}
							value={value}
							onChange={e => setValue(e.currentTarget.value)}
						/>
					</div>
				</header> */}
				<div
					className="scroll-container"
					onScroll={e => {
						if (e.currentTarget.scrollTop > 0) {
							e.currentTarget.classList.add("has-scrolled")
						} else {
							e.currentTarget.classList.remove("has-scrolled")
						}
					}}
				>
					<section className="section">
						<ul className="checkbox-list">
							<CheckboxItem name="Feather" icon={feather.Feather} />
						</ul>
						<ul className="checkbox-list">
							<CheckboxItem
								name="Social"
								icon={p => <feather.ChevronDown style={{ transform: "scale(0.75)", opacity: 0.375 }} strokeWidth={6} {...p} />}
								showCheckbox={false}
							/>
							<ul className="checkbox-list">
								<CheckboxItem name="Original" icon={wkSocial.Twitter} />
								<ul className="checkbox-list">
									<CheckboxItem name="Circle" icon={wkSocial.TwitterCircle} />
								</ul>
								<ul className="checkbox-list">
									<CheckboxItem name="Square" icon={wkSocial.TwitterSquare} />
								</ul>
							</ul>
							<ul className="checkbox-list">
								<CheckboxItem name="Mono" icon={wkSocial.TwitterMono} />
								<ul className="checkbox-list">
									<CheckboxItem name="Circle" icon={wkSocial.TwitterCircleMono} />
								</ul>
								<ul className="checkbox-list">
									<CheckboxItem name="Square" icon={wkSocial.TwitterSquareMono} />
								</ul>
							</ul>
						</ul>
						<ul className="checkbox-list">
							<CheckboxItem
								name="Payment"
								icon={p => <feather.ChevronDown style={{ transform: "scale(0.75)", opacity: 0.375 }} strokeWidth={6} {...p} />}
								showCheckbox={false}
							/>
							<ul className="checkbox-list">
								<CheckboxItem name="Original" icon={wkPayment.Stripe} />
								<ul className="checkbox-list">
									<CheckboxItem name="Filled" icon={wkPayment.Stripe1} />
								</ul>
							</ul>
							<ul className="checkbox-list">
								<CheckboxItem name="Mono" icon={wkPayment.Stripe2} />
								<ul className="checkbox-list">
									<CheckboxItem name="Filled" icon={wkPayment.Stripe3} />
								</ul>
							</ul>
						</ul>
					</section>
					<hr className="hairline" />
					<section className="section">
						<header className="header">
							<h2 className="name u-flex-1">Size</h2>
							<feather.RotateCcw className="undo" strokeWidth={4} />
						</header>
						<div className="slider">
							<div className="interactive-slider u-flex-1">
								<div className="track">
									<div className="thumb"></div>
								</div>
							</div>
							<input type="text" value="32 PX" />
						</div>
					</section>
					<hr className="hairline" />
					<section className="section">
						<header className="header">
							<h2 className="name u-flex-1">Stroke width</h2>
							<feather.RotateCcw className="undo" strokeWidth={4} />
						</header>
						<div className="slider">
							<div className="interactive-slider u-flex-1">
								<div className="track">
									<div className="thumb"></div>
								</div>
							</div>
							<input type="text" value="2.00" />
						</div>
					</section>
					<hr className="hairline" />
				</div>
				<footer className="section">
					<header className="header">
						<h2 className="name u-flex-1">Resources</h2>
					</header>
					<ExtAnchor name="GitHub" icon={wkSocial.Github} />
					<ExtAnchor name="GitHub" icon={wkSocial.Github} />
					<ExtAnchor name="GitHub" icon={wkSocial.Github} />
					<ExtAnchor name="GitHub" icon={wkSocial.Github} />
				</footer>
			</aside>
			<main className="column-2">
				<div className="">Hello</div>
			</main>
			<aside className="column-3">
				<header className="sticky-container">
					<div className="">Hello</div>
				</header>
			</aside>
		</>
	)
}
