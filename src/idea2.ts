function isDelimiter(ch: string) {
	return ch === " " || ch === "-" || (ch >= "A" && ch <= "Z") || (ch >= "0" && ch <= "9")
}

function splitCases(str: string) {
	str = str.replace(/[^a-zA-Z0-9 -]/g, "")

	const parts = []
	for (let x1 = 0; x1 < str.length; x1++) {
		let buffer = ""
		for (let x2 = x1; x2 < str.length; x2++) {
			if (!(str[x2] === " " || str[x2] === "-")) {
				buffer += str[x2]
			}
			if (x2 + 1 === str.length || (x2 + 1 < str.length && isDelimiter(str[x2 + 1]))) {
				// Guard empty buffers e.g. <space><upper> e.g. "Hello World!"
				//                                                    ^^
				if (buffer !== "") {
					parts.push(buffer.toLowerCase())
				}
				x1 = x2
				break
			}
		}
	}
	return parts
}

console.log(splitCases("hello"))
console.log(splitCases("Hello"))

console.log(splitCases("hello-world-lol"))
console.log(splitCases("helloWorld"))
console.log(splitCases("hello world"))
console.log(splitCases("hello World123"))
console.log(splitCases("hello World 123"))
console.log(splitCases("Hello-world"))
console.log(splitCases("HelloWorld"))
console.log(splitCases("Hello world"))
console.log(splitCases("Hello World!"))
