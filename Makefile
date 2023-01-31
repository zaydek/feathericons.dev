.PHONY: feather og build serve

feather:
	npx tsx scripts/feather.ts
	npx tsx scripts/feather-format.ts

og:
	npx concurrently \
		'npx tailwind -c tailwind.config.js --content og/vite/src/index.tsx -o og/vite/src/tw.css -w' \
		'cd og/vite && npx vite dev'

build:
	npx next build
	npx next export
	npx tsx scripts/sitemap.ts

serve:
	npx serve out -l 3000 -n
