tailwind:
	npx tailwind -i src/tailwind.css -o src/tailwind.generated.css

tailwind-watch:
	npx tailwind -i src/tailwind.css -o src/tailwind.generated.css -w

ssg:
	npx vite build
	npx esbuild src/_ssg.tsx \
		--bundle               \
		--define:process.env.NODE_ENV="\"production\"" \
		--format=cjs           \
		--outfile=src/_ssg.generated.cjs \
		--platform=node        \
		--sourcemap
	node --enable-source-maps src/_ssg.generated.cjs
