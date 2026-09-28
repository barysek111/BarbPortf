// Derives "which routes use this component" by walking the real import graph,
// so the design-system docs cannot drift from the code.
//
// Server-only: reads source files at render time.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const SRC = resolve(process.cwd(), "src");

function walkFiles(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walkFiles(full, out);
    else if (/\.tsx?$/.test(entry)) out.push(full);
  }
  return out;
}

/** `@/components/home/Faq` -> absolute path of the file that defines it */
function resolveAlias(spec: string): string | null {
  if (!spec.startsWith("@/")) return null;
  const base = join(SRC, spec.slice(2));
  for (const candidate of [`${base}.tsx`, `${base}.ts`, join(base, "index.tsx")]) {
    try {
      if (statSync(/* turbopackIgnore: true */ candidate).isFile()) return candidate;
    } catch {
      /* keep looking */
    }
  }
  return null;
}

type Edge = { names: string[]; to: string };

function parseImportNames(specifier: string | undefined, defaultName: string | undefined): string[] {
  if (defaultName) return [defaultName];
  if (!specifier) return [];
  return specifier
    .split(",")
    .map((part) => part.trim())
    .filter((part) => part.length > 0 && !part.startsWith("type "))
    .map((part) => part.replace(/^type\s+/, "").split(/\s+as\s+/)[0].trim())
    .filter(Boolean);
}

function importsOf(file: string): Edge[] {
  const src = readFileSync(file, "utf8");
  const edges: Edge[] = [];
  const re = /^\s*import\s+(type\s+)?(?:\{([^}]*)\}|(\w+))\s+from\s+["']([^"']+)["']/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    if (m[1]) continue;
    const to = resolveAlias(m[4]);
    if (!to) continue;
    const names = parseImportNames(m[2], m[3]);
    if (names.length === 0) continue;
    edges.push({ names, to });
  }
  return edges;
}

/** src/app/works/[slug]/page.tsx -> /works/[slug] */
function routeOf(file: string): string {
  const rel = file.slice(join(SRC, "app").length).replace(/\/page\.tsx$/, "");
  return rel === "" ? "/" : rel;
}

function addUsage(usage: Record<string, Set<string>>, name: string, route: string) {
  (usage[name] ??= new Set()).add(route);
}

function walkFrom(
  entry: string,
  usage: Record<string, Set<string>>,
  route: string,
  edgeCache: Map<string, Edge[]>,
) {
  const edges = (f: string) => {
    if (!edgeCache.has(f)) edgeCache.set(f, importsOf(f));
    return edgeCache.get(f)!;
  };

  const seen = new Set<string>();
  const queue = [entry];
  while (queue.length) {
    const file = queue.pop()!;
    if (seen.has(file)) continue;
    seen.add(file);
    for (const edge of edges(file)) {
      if (edge.to.includes(`${SRC}/components`)) {
        for (const name of edge.names) addUsage(usage, name, route);
      }
      if (edge.to.startsWith(SRC)) queue.push(edge.to);
    }
  }
}

/**
 * Maps every exported component name to the routes that reach it, directly or
 * through another component. The design-system route is excluded so the list
 * reflects real site usage rather than the catalogue itself.
 */
export function getComponentUsage(exclude = "/design-system"): Record<string, string[]> {
  const files = walkFiles(SRC);
  const pages = files.filter((f) => /\/app\/.*page\.tsx$/.test(f));
  const edgeCache = new Map<string, Edge[]>();

  const usage: Record<string, Set<string>> = {};

  for (const page of pages) {
    const route = routeOf(page);
    if (route === exclude) continue;
    walkFrom(page, usage, route, edgeCache);
  }

  const layout = join(SRC, "app", "layout.tsx");
  const allRoutes = pages.map(routeOf).filter((r) => r !== exclude).sort();
  try {
    for (const route of allRoutes) {
      walkFrom(layout, usage, route, edgeCache);
    }
  } catch {
    /* no layout */
  }

  return Object.fromEntries(
    Object.entries(usage).map(([k, v]) => [k, [...v].sort()])
  );
}
