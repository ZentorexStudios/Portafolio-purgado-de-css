import { readFile, writeFile } from "node:fs/promises";
import { glob } from "glob";
import { PurgeCSS } from "purgecss";

const cssFiles = await glob("dist/assets/*.css");
const results = await new PurgeCSS().purge({
    content: ["dist/index.html", "src/script.js"],
    css: cssFiles,
    safelist: {
        standard: ["open", "visible"],
        deep: [/^html\[data-theme/]
    }
});

await Promise.all(
    results.map(async ({ file, css }) => {
        await readFile(file);
        await writeFile(file, css);
    })
);
