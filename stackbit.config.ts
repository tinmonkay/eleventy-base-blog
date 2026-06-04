import { defineStackbitConfig, SiteMapEntry } from "@stackbit/types";
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
					urlPath: "/blog/{slug}",
					filePath: "content/blog/{slug}.md",
					fields: [{ name: "title", type: "string", required: true }],
				},
				{
					name: "Page",
					type: "page",
					urlPath: "/{slug}",
					filePath: "content/{slug}.md",
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
	siteMap: ({ documents, models }) => {
		// 1. Filter all page models
		const pageModels = models.filter((m) => m.type === "page");

		return (
			documents
				// 2. Filter all documents which are of a page model
				.filter((d) => pageModels.some((m) => m.name === d.modelName))
				// 3. Map each document to a SiteMapEntry
				.map((document) => {
					// Map the model name to its corresponding URL
					const urlModel = (() => {
						switch (document.modelName) {
							case "Page":
								return "otherPage";
							case "Blog":
								return "otherBlog";
							default:
								return null;
						}
					})();

					return {
						stableId: document.id,
						urlPath: `/${urlModel}/${document.id}`,
						document,
						isHomePage: false,
					};
				})
				.filter(Boolean) as SiteMapEntry[]
		);
	},
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
