import { cp, mkdir, rm } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const output = join(root, "public");

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const source of ["index.html", "assets", "papers"]) {
  await cp(join(root, source), join(output, source), { recursive: true });
}

console.log("Sites public assets synchronized");
