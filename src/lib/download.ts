import JSZip from "jszip"

export function downloadText({ filename, content }: { filename: string; content: string }) {
	const downloadUrl = URL.createObjectURL(new Blob([content], { type: "text/plain;charset=utf-8" }))
	const a = document.createElement("a")
	a.style.display = "none"
	a.setAttribute("download", filename)
	a.setAttribute("href", downloadUrl)
	document.body.appendChild(a)
	a.click()
	document.body.removeChild(a)
	URL.revokeObjectURL(downloadUrl)
}

export function downloadFile({ filename, content, type }: { filename: string; content: Blob; type: string }) {
	const downloadUrl = URL.createObjectURL(content)
	const a = document.createElement("a")
	a.style.display = "none"
	a.setAttribute("download", filename)
	a.setAttribute("href", downloadUrl)
	a.setAttribute("type", type)
	document.body.appendChild(a)
	a.click()
	document.body.removeChild(a)
	URL.revokeObjectURL(downloadUrl)
}

export async function downloadZipArchive(name: string, files: { filename: string; content: string }[]) {
	const zip = new JSZip()
	for (const { filename, content } of files) {
		zip.file(filename, content)
	}
	const zipBlob = await zip.generateAsync({ type: "blob" })
	const downloadUrl = URL.createObjectURL(zipBlob)
	const a = document.createElement("a")
	a.style.display = "none"
	a.setAttribute("download", `${name}.zip`)
	a.setAttribute("href", downloadUrl)
	document.body.appendChild(a)
	a.click()
	document.body.removeChild(a)
	URL.revokeObjectURL(downloadUrl)
}
