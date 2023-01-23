// E.g. <a style="display: none;" download={filename} href={contents}>
//
// https://stackoverflow.com/a/18197341
export function download(filename: string, contents: string) {
	const a = document.createElement("a")
	a.style.display = "none"
	a.setAttribute("download", filename)
	a.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(contents))
	document.body.appendChild(a)
	a.click()
	a.remove()
}
