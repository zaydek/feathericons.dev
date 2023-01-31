feather:
	npx tsx scripts/feather.ts
	npx tsx scripts/feather-format.ts

dev-og:
	npx concurrently \
		'npx tailwind -c tailwind.config.js --content og/src/index.tsx -o og/public/tw.css -w' \
		'cd og && npx vite dev'

build:
	npx next build
	npx next export
	npx tsx scripts/sitemap.ts

serve:
	npx serve out -l 3000 -n
