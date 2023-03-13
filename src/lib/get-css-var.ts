export function getCssVar(varName: string, { scope }: { scope?: HTMLElement } = {}) {
	return window.getComputedStyle(scope ?? document.documentElement).getPropertyValue(varName)
}

export function getCssVarAsNumber(varName: string, { scope }: { scope?: HTMLElement } = {}) {
	return parseInt(getCssVar(varName, { scope }))
}
