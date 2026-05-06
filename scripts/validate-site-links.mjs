import { existsSync, readdirSync, statSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const siteUrl = "https://eurogigolo.github.io/macro-desk/";
const errors = [];

function listFiles(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name === ".git") continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

function normalizeLocalTarget(target, sourceFile) {
  const cleanTarget = target.split("#", 1)[0].split("?", 1)[0];
  if (!cleanTarget) return null;

  if (cleanTarget.startsWith(siteUrl)) {
    return cleanTarget.slice(siteUrl.length) || "index.html";
  }

  if (/^https?:\/\//i.test(cleanTarget)) {
    if (cleanTarget.includes("example.com")) {
      errors.push(`${path.relative(root, sourceFile)} references placeholder URL ${target}`);
    }
    if (/[)\].,;:]$/.test(cleanTarget)) {
      errors.push(`${path.relative(root, sourceFile)} has likely trailing punctuation in URL ${target}`);
    }
    return null;
  }

  if (/^(mailto|tel|javascript):/i.test(cleanTarget)) return null;
  if (cleanTarget.startsWith("/")) {
    errors.push(`${path.relative(root, sourceFile)} uses root-relative URL ${target}; use a macro-desk-relative URL`);
    return null;
  }

  return path.relative(root, path.resolve(path.dirname(sourceFile), cleanTarget));
}

function assertExists(target, sourceFile) {
  const relativeTarget = normalizeLocalTarget(target, sourceFile);
  if (!relativeTarget) return;

  const absoluteTarget = path.resolve(root, relativeTarget);
  if (!absoluteTarget.startsWith(root)) {
    errors.push(`${path.relative(root, sourceFile)} links outside the site: ${target}`);
    return;
  }

  if (existsSync(absoluteTarget)) {
    const stats = statSync(absoluteTarget);
    if (!stats.isDirectory() || existsSync(path.join(absoluteTarget, "index.html"))) return;
  }

  const directoryIndex = path.join(absoluteTarget, "index.html");
  if (existsSync(directoryIndex)) return;

  errors.push(`${path.relative(root, sourceFile)} references missing file ${target}`);
}

if (!existsSync(path.join(root, "index.html"))) {
  errors.push("Missing root index.html");
}

for (const file of listFiles(root)) {
  const relativeFile = path.relative(root, file);
  const extension = path.extname(file).toLowerCase();
  if (extension === ".html") {
    const html = await readFile(file, "utf8");
    for (const match of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)) {
      assertExists(match[1], file);
    }
  }

  if (relativeFile === "feed.xml") {
    const xml = await readFile(file, "utf8");
    for (const match of xml.matchAll(/https?:\/\/[^\s<>"']+/gi)) {
      assertExists(match[0], file);
    }
  }
}

if (errors.length > 0) {
  console.error("Broken site links found:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("No broken site links found.");
