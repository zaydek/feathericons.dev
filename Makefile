tailwind-w:
	npx tailwindcss -i src/css/tailwind.css -o src/css/tailwind.generated.css -w
tailwind:
	npx tailwindcss -i src/css/tailwind.css -o src/css/tailwind.generated.css

feather:
	npx tsx scripts/feather.ts
feather-format:
	npx tsx scripts/feather-format.ts

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
