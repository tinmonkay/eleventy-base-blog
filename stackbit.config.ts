import { defineStackbitConfig } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
	stackbitVersion: "~0.6.0",
	nodeVersion: "18",
	ssgName: "eleventy",
	contentSources: [
		new GitContentSource({
			rootPath: __dirname,
			contentDirs: ["content"],
			models: [
				{
					name: "Post",
					type: "page",
					urlPath: "/{slug}",
					filePath: "content/blog/{slug}.md",
					fields: [{ name: "title", type: "string", required: true }],
				},
			],
			assetsConfig: {
				referenceType: "static",
				staticDir: "public",
				uploadDir: "img",
				publicPath: "/",
			},
		}),
	],
	postInstallCommand: "npm i --no-save @stackbit/types",

	// Eleventy to run inside Visual Editor container
	devCommand: "npx @11ty/eleventy --serve --port {PORT}",

	// Eleventy-specific configuration
	experimental: {
		ssg: {
			proxyWebsockets: true,
			logPatterns: {
				up: ["Server at"],
			},
		},
	},

	// Specific option to prevent Visual Editor from interfering with Eleventy's page reload mechanism
	customContentReload: true,
});
