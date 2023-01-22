// https://github.com/Andarist/use-isomorphic-layout-effect/blob/main/src/index.ts

import { useEffect, useLayoutEffect } from "react"

export const useIsomorphicLayoutEffect = typeof document !== "undefined"
	? useLayoutEffect
	: useEffect
