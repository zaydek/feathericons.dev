const isLower = (ch: string) => ch >= "a" && ch <= "z"
const isUpper = (ch: string) => ch >= "A" && ch <= "Z"
const isDigit = (ch: string) => ch >= "0" && ch <= "9"
const isAlpha = (ch: string) => isLower(ch) || isUpper(ch) || isDigit(ch)

function splitParts(str: string) {
	const parts = []
	outer:
	for (let ii = 0; ii < str.length; ii++) {
		for (let jj = ii; jj < str.length; jj++) {
			if ((isLower(str[jj]) || isDigit(str[jj])) &&        // E.g. [a-z0-9]
					(jj + 1 < str.length && isUpper(str[jj + 1]))) { // E.g. [A-Z]
				parts.push((str.slice(ii, jj + 1)).toLowerCase())
				ii = jj
				break
			} else if (jj + 1 === str.length) {
				parts.push((str.slice(ii)).toLowerCase())
				break outer // Done
			}
		}
	}
	return parts
}

function trim(str: string) {
	return str.replace(/[^a-zA-Z0-9]/g, "")
}

function splitParts2(str: string) {
	const parts = []
	outer:
	for (let curr = 0; curr < str.length; curr++) {
		for (let next = curr; next < str.length; next++) {
			if ((isLower(str[next]) || isDigit(str[next])) &&        // E.g. [a-z0-9]
					(next + 1 < str.length && isUpper(str[next + 1]))) { // E.g. [A-Z]
				parts.push(str.slice(curr, next + 1))
				curr = next
				break
			} else if (!isAlpha(str[next]) &&                        // E.g. [^a-zA-Z0-9]
					(next + 1 < str.length && isAlpha(str[next + 1]))) { // E.g. [a-zA-Z0-9]
				parts.push(str.slice(curr, next + 0)) // Remove non-alpha
				curr = next
				break
			} else if (next + 1 === str.length) {
				parts.push(trim(str.slice(curr))) // Trim non-alpha
				break outer // Done
			}
		}
	}
	return parts
}

function splitParts3(str: string) {
	return str
		.split(/(?=[A-Z])|[^a-zA-Z0-9]+/)
		.filter(v => v !== "")
}

console.log(splitParts3("whatNiceWeather12").map(v => v.toLowerCase()))
console.log(splitParts3("what-nice-weather12").map(v => v.toLowerCase()))
console.log(splitParts3("what nice weather12").map(v => v.toLowerCase()))
console.log(splitParts3("WhatNiceWeather12").map(v => v.toLowerCase()))
console.log(splitParts3("arrow ").map(v => v.toLowerCase()))
