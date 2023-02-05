import * as feather from "../data/react-feather"

import { Anchor, AnchorProps } from "../components/anchor"
import { DynamicIcon, SvgComponent } from "../components/dynamic-icon"
import { version } from "../data/manifest"
import { iota } from "../lib/iota"

function Logo() {
	return (
		//// return <div className="h-64 w-64 rounded-1e3 bg-white"></div>
		<svg className="h-64 w-64 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28" fill="currentColor">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M21.5308 13.5393L21.5329 13.5372C22.4712 12.5992 22.9983 11.327 22.9983 10.0004C22.9983 8.67391 22.4712 7.4017 21.5329 6.46369C21.4156 6.34644 21.2931 6.23561 21.1659 6.13143C20.2756 5.40218 19.1561 4.99872 17.995 4.99872C16.668 4.99872 15.3954 5.52568 14.4571 6.46369L8 12.9187L8 18.5885L17.2921 9.2994L17.2929 9.29857C17.6834 8.90817 18.3166 8.90817 18.7071 9.29857C19.0976 9.68897 19.0976 10.3219 18.7071 10.7123M18.7071 10.7123L13.4142 16.0035H19.0731L21.5308 13.5393M11.4142 18.0029L9.41421 20.0022H15.0849L17.079 18.0029H11.4142ZM7.41421 22.0016L4.70776 24.7072C4.31724 25.0976 3.68342 25.0982 3.29289 24.7078C2.90237 24.3174 2.90237 23.6845 3.29289 23.2941L3.29382 23.2932L6 20.5878L6 12.5046C6 12.2395 6.10536 11.9852 6.29289 11.7978L6.58523 11.5055L13.0429 5.04993C14.3563 3.73697 16.1376 2.99936 17.995 2.99936C19.8524 2.99936 21.6337 3.73697 22.9471 5.04993C23.1113 5.21405 23.2665 5.38548 23.4123 5.56345C24.4334 6.80927 24.9983 8.37575 24.9983 10.0004C24.9983 11.8567 24.2609 13.6369 22.9483 14.9497L22.9471 14.951L20.2937 17.6114C20.2409 17.6802 20.1794 17.7419 20.1107 17.7949L18.4957 19.4141L16.2082 21.7078C16.0205 21.8959 15.7657 22.0016 15.5 22.0016H7.41421ZM21.4601 19.2736L17.6245 23.1194C17.0616 23.6838 16.2972 24.001 15.5 24.001H8.24264L6.12132 26.1216C4.94975 27.2928 3.05025 27.2928 1.87868 26.1216C0.707109 24.9504 0.707106 23.0515 1.87868 21.8803L4 19.7597V12.5046C4 11.7093 4.31607 10.9464 4.87868 10.384L11.6287 3.63617C13.3171 1.94826 15.6072 1 17.995 1C20.3828 1 22.6729 1.94826 24.3613 3.63617C26.0498 5.32408 26.9983 7.61338 26.9983 10.0004C26.9983 12.3869 26.0502 14.6757 24.3625 16.3635L24.3613 16.3647L21.7769 18.956C21.6794 19.0696 21.5735 19.1758 21.4601 19.2736Z"
			/>
		</svg>
	)
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

function CallToActionAnchor({ primary = undefined, icon, children, ...props }: { primary?: true; icon: SvgComponent } & AnchorProps) {
	return (
		<Anchor
			className="h-64 w-100% max-w-[calc(64px_*_6)] rounded-[calc(64px_*_0.375)] bg-[#fff3] sm:aspect-[3] sm:rounded-1e3
				[&[data-primary]]:bg-white"
			data-primary={primary}
			{...props}
		>
			<div className="flex h-100% items-center justify-center">
				<div className="-ml-[calc((48px_-_24px)_/_2)] flex h-48 w-48 items-center justify-center">
					<DynamicIcon className="h-24 w-24 text-white [[data-primary]_&]:text-gray-900" icon={icon} />
				</div>
				{/* {children} */}
				<div className="aspect-[8] h-6 rounded-1e3 bg-white [[data-primary]_&]:bg-gray-900"></div>
			</div>
		</Anchor>
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
		<header className="flex justify-center py-64 px-16 pt-96 sm:py-96" data-background-hero>
			<div className="flex w-100% max-w-[var(--header-w)] flex-col justify-evenly gap-64 sm:items-center xl:flex-row">
				{/* LHS */}
				<div className="flex flex-col items-center gap-32">
					<Logo />
					<HeadingSubheading />
					{/* Use items-center ... self-stretch to conditionally center y-axis */}
					<div className="flex flex-col items-center gap-16 self-stretch sm:flex-row sm:self-start">
						{/* prettier-ignore */}
						<CallToActionAnchor
							href="https://github.com/feathericons/feather"
							primary
							icon={feather.Github}
						>
							{/* ... */}
						</CallToActionAnchor>
						{/* prettier-ignore */}
						<CallToActionAnchor
							download={`feather@${version}.zip`} href="/feather.zip"
							icon={feather.Download}
						>
							{/* ... */}
						</CallToActionAnchor>
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
