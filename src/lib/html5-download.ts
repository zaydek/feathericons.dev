export function html5DownloadAsText(filename: string, text: string) {
	const a = document.createElement("a")
	a.style.display = "none"
	a.setAttribute("download", filename)
	a.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text))
	document.body.appendChild(a)
	a.click()
	a.remove()
}

export function html5DownloadAsFile(filename: string, href: string) {
	const a = document.createElement("a")
	a.style.display = "none"
	a.setAttribute("download", filename)
	a.setAttribute("href", href)
	document.body.appendChild(a)
	a.click()
	a.remove()
}
