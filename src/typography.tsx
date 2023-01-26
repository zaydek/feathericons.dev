import { createStyled } from "./lib/react/create-styled"
import { Icon, IconComponent } from "./lib/react/icon"

// Typography
export const TypographyCaps = createStyled("typography-caps")
export const TypographySmallSans = createStyled("typography-small-sans")

// Iconography
//
// TODO: DEPRECATE
export function ThickIcon({ icon, ...props }: { icon: IconComponent } & Exclude<JSX.IntrinsicElements["svg"], "strokeWidth">): JSX.Element {
	return <Icon icon={icon} strokeWidth={2.5} {...props} />
}
