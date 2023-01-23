// https://nextjs.org/docs/advanced-features/using-mdx#setup-nextmdx-in-nextjs
const withMdx = require('@next/mdx')({
	extension: /\.mdx$/,
	options: {
		//// 	//// remarkPlugins: [],
		//// 	//// rehypePlugins: [],
		providerImportSource: "@mdx-js/react",
	},
})

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["ts", "tsx", "md", "mdx"],
	reactStrictMode: false,
}

module.exports = withMdx(nextConfig)
