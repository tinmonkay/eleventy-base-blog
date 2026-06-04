var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// stackbit.config.ts
var stackbit_config_exports = {};
__export(stackbit_config_exports, {
  default: () => stackbit_config_default
});
module.exports = __toCommonJS(stackbit_config_exports);
var import_types = require("@stackbit/types");
var import_cms_git = require("@stackbit/cms-git");
var stackbit_config_default = (0, import_types.defineStackbitConfig)({
  stackbitVersion: "~0.6.0",
  nodeVersion: "18",
  ssgName: "eleventy",
  contentSources: [
    new import_cms_git.GitContentSource({
      rootPath: "/Users/kp/projects/eleventy-base-blog",
      contentDirs: ["content"],
      models: [
        {
          name: "Post",
          type: "page",
          urlPath: "/blog/{slug}",
          filePath: "content/blog/{slug}.md",
          fields: [{ name: "title", type: "string", required: true }]
        },
        {
          name: "Page",
          type: "page",
          urlPath: "/{slug}",
          filePath: "content/{slug}.md",
          fields: [{ name: "title", type: "string", required: true }]
        }
      ],
      assetsConfig: {
        referenceType: "static",
        staticDir: "public",
        uploadDir: "img",
        publicPath: "/"
      }
    })
  ],
  siteMap: ({ documents, models }) => {
    const pageModels = models.filter((m) => m.type === "page");
    return documents.filter((d) => pageModels.some((m) => m.name === d.modelName)).map((document) => {
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
        isHomePage: false
      };
    }).filter(Boolean);
  },
  postInstallCommand: "npm i --no-save @stackbit/types",
  // Eleventy to run inside Visual Editor container
  devCommand: "npx @11ty/eleventy --serve --port {PORT}",
  // Eleventy-specific configuration
  experimental: {
    ssg: {
      proxyWebsockets: true,
      logPatterns: {
        up: ["Server at"]
      }
    }
  },
  // Specific option to prevent Visual Editor from interfering with Eleventy's page reload mechanism
  customContentReload: true
});
//# sourceMappingURL=stackbit.config.6H5JGUGH.cjs.map
