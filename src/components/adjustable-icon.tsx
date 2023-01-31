import { cx } from "../lib/cx"
import { Icon, IconProps } from "../lib/react/icon"

// No JavaScript here 😋
export function AdjustableIcon({ className, ...props }: IconProps) {
	return <Icon className={cx(className, `[transform:_scale(var(--grid-icon-scale))] [stroke-width:_var(--grid-icon-stroke-width)]`)} {...props} />
}
