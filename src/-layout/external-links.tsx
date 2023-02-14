import * as feather from "../data/react-feather"

import { Anchor, AnchorProps } from "../components/anchor"
import { TypographyCaps } from "../components/bindings"
import { DynamicIcon, Icon } from "../components/dynamic-icon"
import { twitterShareUrl } from "../constants"

function ExternalLink({ icon, children, ...props }: { icon: Icon } & AnchorProps) {
	return (
		// TODO
		<Anchor className="flex h-32 items-center" {...props}>
			<div className="flex h-32 w-32 items-center justify-center">
				<DynamicIcon className="h-16 w-16 fill-current text-white" icon={icon} />
			</div>
			<TypographyCaps className="text-white">{children}</TypographyCaps>
		</Anchor>
	)
}

export function ExternalLinks() {
	return (
		<>
			<div className="absolute top-16 left-16">
				{/* TL */}
				<ExternalLink href="https://github.com/feathericons/feather" icon={feather.Star}>
					STAR ON GITHUB
				</ExternalLink>
			</div>
			{/* TR */}
			<div className="absolute top-16 right-16">
				<ExternalLink href={twitterShareUrl} icon={feather.Twitter}>
					SHARE ON TWITTER
				</ExternalLink>
			</div>
		</>
	)
}
