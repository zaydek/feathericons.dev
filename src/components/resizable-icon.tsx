import { cx } from "../lib/cx"
import { Dynamic, DynamicProps } from "./dynamic-icon"

// No JavaScript here 😋
export function ResizableIcon({ className, ...props }: DynamicProps) {
	return <Dynamic className={cx(className, `[transform:_scale(var(--icon-scale))] [stroke-width:_var(--icon-stroke-width)]`)} {...props} />
}
