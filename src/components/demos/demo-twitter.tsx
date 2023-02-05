import { twitterShareUrl } from "../../constants"
import * as feather from "../../data/react-feather"

import { Anchor } from "../anchor"
import { TwitterIcon } from "../icon-config"
import { ResizableIcon } from "../resizable-icon"
import { DemoContainer } from "./shared"

export function DemoTwitter() {
	return (
		<DemoContainer>
			<div className="flex h-100% items-center justify-center">
				<div className="flex flex-col gap-8">
					<Anchor
						className="group/button flex items-center rounded-1e3 bg-white px-8 pr-32 shadow-[var(--shadow-2)]
							hover:bg-gray-100
							hover:active:bg-[var(--theme-color)]
							hover:active:shadow-[var(--inset-shadow-2)]"
						href={twitterShareUrl}
					>
						<div className="flex h-48 w-48 items-center justify-center">
							{/* Use !text-* here because icons may have colors */}
							<ResizableIcon className="h-20 w-20 text-gray-700 group-hover/button:group-active/button:!text-white" icon={feather[name]} />
						</div>
						<div className="aspect-[16] h-6 rounded-1e3 bg-gray-300 group-hover/button:group-active/button:bg-white"></div>
					</Anchor>
					<Anchor
						className="group/button flex items-center rounded-1e3 bg-white px-8 pr-32 shadow-[var(--shadow-2)]
							hover:bg-gray-100
							hover:active:bg-[var(--theme-color)]
							hover:active:shadow-[var(--inset-shadow-2)]"
						href={twitterShareUrl}
					>
						<div className="flex h-48 w-48 items-center justify-center">
							{/* Use !text-* here because icons may have colors */}
							<ResizableIcon className="h-20 w-20 text-gray-700 group-hover/button:group-active/button:!text-white" icon={TwitterIcon} />
						</div>
						<div className="aspect-[16] h-6 rounded-1e3 bg-gray-300 group-hover/button:group-active/button:bg-white"></div>
					</Anchor>
				</div>
			</div>
		</DemoContainer>
}
