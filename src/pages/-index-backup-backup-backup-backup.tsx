import { cx } from "@/lib"
import { createElement, PropsWithChildren, useEffect, useRef, useState } from "react"

import { IconComponent } from "@/components/dynamic-icon"
import { CreativeCommons } from "@/components/license"
import * as feather from "@/feather"
import * as wkVendor from "@/wolf-kit/payment"
import * as wkSocial from "@/wolf-kit/social-media"

////////////////////////////////////////////////////////////////////////////////

function createStyled(argClassName: string) {
	// Use tag ?? "div" because TypeScript errs: Type '"div"' is not assignable to type 'Tag'.
	function Styled<Tag extends keyof JSX.IntrinsicElements = "div">({ tag, className, children, ...props }: { tag?: Tag } & JSX.IntrinsicElements[Tag]) {
		return <>{createElement(tag ?? "div", { className: cx(argClassName, className), ...props }, children)}</>
	}
	Styled.className = argClassName
	return Styled
}

const TypographySmallSans = createStyled("font-400_12px_/_normal_$font-sans")
const TypographySans = createStyled("font-400_15px_/_normal_$font-sans")
const TypographyCaps = createStyled("font-500_10px_/_normal_$font-sans text-x-0.1em [text-transform]-uppercase")

function Heading({ showResetButton = true, children }: PropsWithChildren<{ showResetButton?: boolean }>) {
	return (
		<div className="ml-$optical-keyline h-$heading-height flex justify-between items-center">
			{/* Must use shadow-$inset-hairline-shadow here because of scrolling container */}
			<div className="h-$heading-height px-($heading-height_/_2) flex items-center bg-white rounded-1e3 shadow-$inset-hairline-shadow">
				<TypographyCaps tag="h2" className="color-$slate-700">
					{children}
				</TypographyCaps>
			</div>
			{showResetButton && (
				<feather.RotateCcw className="m-(($container-height_-_$tiny-icon-height)_/_2) size-$tiny-icon-height color-$slate-400" strokeWidth={4} />
			)}
		</div>
	)
}

////////////////////////////////////////////////////////////////////////////////

function SearchBar() {
	const ref = useRef<HTMLInputElement | null>(null)
	const [value, setValue] = useState("")

	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (e.metaKey && e.key === "p") {
				e.preventDefault() // Sorry printers
				ref.current!.focus()
			}
		}
		window.addEventListener("keydown", handleKeyDown, false)
		return () => window.removeEventListener("keydown", handleKeyDown, false)
	}, [])

	return (
		<div className="search-bar mx-$optical-keyline flex">
			<feather.Search className="m-(($search-bar-height_-_$icon-height)_/_2) size-$icon-height color-$slate-400" strokeWidth={4} />
			<input
				ref={ref}
				className={cx(TypographySans.className, "grow-1 color-$slate-700 placeholder:color-$slate-500 focus:placeholder:opacity-0%")}
				type="text"
				placeholder="Press ⌘P to focus"
				value={value}
				onChange={e => setValue(e.currentTarget.value)}
			/>
		</div>
	)
}

////////////////////////////////////////////////////////////////////////////////

function Hairline() {
	return <div className="shrink-0 h-1 bg-$slate-300"></div>
}

function Section({ children }: PropsWithChildren) {
	return <div className="px-$padding-x flex flex-col gap-16">{children}</div>
}

function Checkbox({ name, icon: Icon, children }: PropsWithChildren<{ name: string; icon: IconComponent }>) {
	const [checked, setChecked] = useState(false)

	return (
		// Use flex flex-col so we don't need to CSS reset <button>
		<div className="flex flex-col rounded-($container-height_/_2)" data-effect-checkbox-group>
			<button
				// Use :hover:active for mouse navigation and :focus-visible for
				// keyboard navigation
				className="h-$container-height flex items-center rounded-1e3 [&:is(:hover:active,_:focus-visible)]:bg-$slate-300"
				onClick={e => setChecked(curr => !curr)}
				tabIndex={0}
			>
				<Icon className="m-(($container-height_-_$icon-height)_/_2) size-$icon-height color-$slate-700" />
				<TypographySans className="grow-1 color-$slate-700">{name}</TypographySans>
				<div className="checkbox m-(($container-height_-_$checkbox-height)_/_2) flex center" aria-checked={checked}>
					{checked && <feather.Check className="size-$tiny-icon-height color-white" strokeWidth={8} />}
				</div>
			</button>
			{children !== undefined && <div className="ml-($container-height_/_2)">{children}</div>}
		</div>
	)
}

function Slider() {
	return (
		<div className="mx-$optical-keyline h-$slider-thumb-height flex flex-col justify-center">
			<div className="h-$slider-track-height flex justify-center items-center bg-image-linear-gradient(to_right,_$sky-400_50%,_$hairline-color_50%) rounded-1e3">
				<div className="size-$slider-thumb-height bg-white rounded-1e3 shadow-$hairline-shadow,_$realistic-shadow"></div>
			</div>
		</div>
	)
}

////////////////////////////////////////////////////////////////////////////////

export default function Page() {
	//// const [didScroll, setDidScroll] = useState(false)

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

	return (
		<>
			{showOutline && <style>{`*:not(svg *) { outline: 1px solid hsl(0, 100%, 50%, 0.125); }`}</style>}
			<div className="flex">
				{/* LHS */}
				<div className="h-100dvh w-$sidebar-width flex flex-col shadow-$hairline-shadow">
					{/* Sticky container */}
					{/* <div className={cx("sticky t-0 p-$padding flex flex-col gap-16", didScroll && "shadow-$hairline-shadow")}> */}
					<div className="sticky t-0 p-$padding pb-$spacing flex flex-col gap-16 shadow-$hairline-b-shadow">
						<Heading>Search</Heading>
						<SearchBar />
					</div>
					{/* Scroll container */}
					<div
						className="py-$padding-y pt-$spacing overflow-y-scroll flex flex-col gap-$spacing"
						//// onScroll={e => {
						//// 	setDidScroll(e.currentTarget.scrollTop > 0)
						//// }}
					>
						<Section>
							<Heading>Icons</Heading>
							<div className="flex flex-col gap-8">
								<Checkbox name="Feather" icon={feather.Feather} />
								<Checkbox name="Social" icon={p => <feather.ChevronDown {...p} style={{ color: "var(--slate-400)" }} strokeWidth={4} />}>
									<Checkbox name="Original" icon={wkSocial.Twitter}>
										<Checkbox name="Circle" icon={wkSocial.TwitterCircle} />
										<Checkbox name="Square" icon={wkSocial.TwitterSquare} />
									</Checkbox>
									<Checkbox name="Monochrome" icon={wkSocial.TwitterMono}>
										<Checkbox name="Circle" icon={wkSocial.TwitterCircleMono} />
										<Checkbox name="Square" icon={wkSocial.TwitterSquareMono} />
									</Checkbox>
								</Checkbox>
								<Checkbox name="Vendor" icon={p => <feather.ChevronDown {...p} style={{ color: "var(--slate-400)" }} strokeWidth={4} />}>
									<Checkbox name="Original" icon={wkVendor.Stripe}>
										<Checkbox name="Inverted" icon={wkVendor.Stripe1} />
									</Checkbox>
									<Checkbox name="Monochrome" icon={wkVendor.Stripe2}>
										<Checkbox name="Inverted" icon={wkVendor.Stripe3} />
									</Checkbox>
								</Checkbox>
							</div>
						</Section>
						<Hairline />
						<Section>
							<Heading>Size</Heading>
							<Slider />
						</Section>
						<Hairline />
						<Section>
							<Heading>Stroke width</Heading>
							<Slider />
						</Section>
						<Hairline />
						<Section>
							<Heading>Licenses</Heading>
							<div className="flex flex-col gap-8">
								{/* prettier-ignore */}
								<LicenseItem icon={p => <feather.Feather {...p} />}>
									<Underline>Feather icons</Underline> designed by <Underline>@colebemis</Underline><br />
									Licensed as <Underline>MIT</Underline><br />
									Personal & commercial use OK <em className="[font-style]-italic">without</em> attribution
								</LicenseItem>
								{/* prettier-ignore */}
								<LicenseItem icon={CreativeCommons}>
									<Underline>Social icons</Underline> sourced from <Underline>The Wolf Kit</Underline><br />
									Licensed as <Underline>CC BY 4.0</Underline><br />
									Personal & commercial use OK <em className="[font-style]-italic">with</em> attribution
								</LicenseItem>
								{/* prettier-ignore */}
								<LicenseItem icon={CreativeCommons}>
									<Underline>Vendor icons</Underline> sourced from <Underline>The Wolf Kit</Underline><br />
									Licensed as <Underline>CC BY 4.0</Underline><br />
									Personal & commercial use OK <em className="[font-style]-italic">with</em> attribution
								</LicenseItem>
							</div>
						</Section>
					</div>
				</div>
				{/* RHS */}
				<div className="grow-1"></div>
			</div>
		</>
	)
}

function Underline({ children }: PropsWithChildren) {
	return <span className="[text-decoration]-underline_$hairline-color [text-underline-offset]-2">{children}</span>
}

function LicenseItem({ icon: Icon, children }: PropsWithChildren<{ icon: IconComponent }>) {
	return (
		<div className="flex">
			{/* E.g. <TypographySmallSans> */}
			<Icon className="m-(($container-height_-_$tiny-icon-height)_/_2) mt-((12px_*_1.4375_-_$tiny-icon-height)_/_2) size-$tiny-icon-height color-$slate-700" />
			<TypographySmallSans tag="p" className="text-y-1.4375 color-$slate-700">
				{children}
			</TypographySmallSans>
		</div>
	)
}
