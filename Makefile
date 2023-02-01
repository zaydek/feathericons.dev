.PHONY: *

esrun:
	npx esbuild \
		--bundle \
		--external:jsdom \
		--format=cjs \
		--platform=node \
		--sourcemap=inline \
	$(entrypoint) \
		| node --enable-source-maps

################################################################################

purge:
	-rm -r node_modules package-lock.json
	npm i

purge-og:
	cd og/vite
	-rm -r node_modules package-lock.json
	npm i

################################################################################

feather:
	make esrun entrypoint=scripts/feather-cache.ts
	make esrun entrypoint=scripts/feather-export.ts

################################################################################

og-dev:
	npx concurrently \
		'npx tailwind -c tailwind.config.js --content og/vite/src/index.tsx -o og/vite/src/tw.generated.css -w' \
		'cd og/vite && npx vite dev'

og:
	make esrun entrypoint=scripts/og.ts

################################################################################

out:
	npx next build
	npx next export
	make esrun entrypoint=scripts/sitemap.ts

serve-out:
	npx serve out -l 3000 -n
