# Generates Feather assets
feather:
	npx tsx scripts/feather.ts
feather-format:
	npx tsx scripts/feather-format.ts

# Generates SSG
ssg:
	npx next build
	npx next export
	npx serve out -l 3000
