import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
for (const file of ["src/site-config.js", "src/preview-config.js", "src/catalog.js", "src/demo-catalog.js", "src/homepage.js", "src/app.js", "src/guidance.js", "src/guidance-pages.mjs", "src/build-guidance.mjs", "src/commerce-core.js", "src/commerce.js", "src/shop-pages.mjs", "src/reviews.mjs", "build.mjs"]) {
  const result = spawnSync(process.execPath, ["--check", path.join(root, file)], { stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status || 1);
}
console.log("JavaScript syntax checks passed (this project has no TypeScript type system).");
