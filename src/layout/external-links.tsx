import * as typography from "../components/export-star-typography"
import * as feather from "../data/react-feather"

import { Anchor, AnchorProps } from "../components/anchor"
import { DynamicIcon, Svg } from "../components/dynamic-icon"
import { twitterShareUrl } from "../constants"

function ExternalLink({ icon, children, ...props }: { icon: Svg } & AnchorProps) {
	return (
		<Anchor className="flex h-32 items-center rounded-1e3 bg-black/25 pr-16" {...props}>
			<div className="flex h-32 w-32 items-center justify-center">
				<DynamicIcon className="h-16 w-16 fill-current text-white" icon={icon} />
			</div>
			<typography.Caps className="text-white">{children}</typography.Caps>
		</Anchor>
	)
}

export function ExternalLinks() {
	return (
		<>
			<div className="absolute top-16 left-16">
				<ExternalLink href="https://github.com/feathericons/feather" icon={feather.Star}>
					STAR ON GITHUB
				</ExternalLink>
			</div>
			<div className="absolute top-16 right-16">
				<ExternalLink href={twitterShareUrl} icon={feather.Twitter}>
					SHARE ON TWITTER
				</ExternalLink>
			</div>
		</>
	)
}
