import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { buildGuidance } from "./src/build-guidance.mjs";

const project = path.dirname(fileURLToPath(import.meta.url));
const output = path.join(project, "dist");
const modeContext = { window: {} };
vm.runInNewContext(await readFile(path.join(project, "src/site-config.js"), "utf8"), modeContext);
if (modeContext.window.STORE_CONFIG.siteMode === "guidance") {
  await buildGuidance(project, output, modeContext.window.STORE_CONFIG);
  process.exit(0);
}
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const name of ["index.html", "storefront.css", "storefront-layout.css"]) {
  await cp(path.join(project, name), path.join(output, name), { recursive: true });
}
const configContext = { window: {} };
vm.runInNewContext(await readFile(path.join(project, "src/site-config.js"), "utf8"), configContext);
const catalogContext = { window: {} };
vm.runInNewContext(await readFile(path.join(project, "src/catalog.js"), "utf8"), catalogContext);
const demoContext = { window: {} };
vm.runInNewContext(await readFile(path.join(project, "src/demo-catalog.js"), "utf8"), demoContext);
const previewStage = configContext.window.STORE_CONFIG.previewStage;
const activeCatalog = previewStage ? demoContext.window.STORE_DEMO_CATALOG : catalogContext.window.STORE_CATALOG;
await mkdir(path.join(output, "src"), { recursive: true });
const srcFiles = previewStage ? ["app.js", "homepage.js", "demo-catalog.js"] : ["app.js", "homepage.js", "site-config.js", "catalog.js"];
for (const name of srcFiles) await cp(path.join(project, "src", name), path.join(output, "src", name));
if (previewStage) await cp(path.join(project, "src", "preview-config.js"), path.join(output, "src", "site-config.js"));
await mkdir(path.join(output, "assets"), { recursive: true });
await cp(path.join(project, "assets", "brand"), path.join(output, "assets", "brand"), { recursive: true });
if (previewStage) {
  for (const name of ["demo-hero.webp", "demo-stones.webp", "demo-bracelet.webp", "demo-heart.webp", "category-tumbled-v2.png", "category-jewelry-v2.png", "category-hearts-v2.png", "category-moons-v2.png", "category-wands-v2.png"]) {
    await cp(path.join(project, "assets", name), path.join(output, "assets", name));
  }
} else {
  await mkdir(path.join(output, "assets", "products"), { recursive: true });
  await cp(path.join(project, "assets", "products", "organized"), path.join(output, "assets", "products", "organized"), { recursive: true });
}
let routeHtml = await readFile(path.join(project, "storefront.html"), "utf8");
if (previewStage) routeHtml = routeHtml.replace(/  <script defer src="\/src\/catalog\.js"><\/script>\r?\n/, "");
else routeHtml = routeHtml.replace(/  <script defer src="\/src\/demo-catalog\.js"><\/script>\r?\n/, "");
await writeFile(path.join(output, "index.html"), routeHtml);
const routes = activeCatalog.collections.map((x) => "collections/" + x.slug)
  .concat(activeCatalog.products.map((x) => "products/" + x.slug), ["checkout"]);
for (const route of routes) {
  const directory = path.join(output, route);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, "index.html"), routeHtml);
}
console.log("Built " + (routes.length + 1) + " entry routes into " + output + (previewStage ? " (design preview catalog; client catalog assets excluded)" : ""));
