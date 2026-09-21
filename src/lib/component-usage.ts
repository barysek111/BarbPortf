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
      if (statSync(candidate).isFile()) return candidate;
    } catch { /* keep looking */ }
  }
  return null;
}

type Edge = { names: string[]; to: string };

function importsOf(file: string): Edge[] {
  const src = readFileSync(file, "utf8");
  const edges: Edge[] = [];
  // import { A, B } from "@/x"   /   import A from "@/x"
  const re = /import\s+(?:\{([^}]*)\}|(\w+))\s+from\s+["']([^"']+)["']/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    const to = resolveAlias(m[3]);
    if (!to) continue;
    const names = m[1]
      ? m[1].split(",").map((n) => n.trim().split(/\s+as\s+/)[0].trim()).filter(Boolean)
      : [m[2]];
    edges.push({ names, to });
  }
  return edges;
}

/** src/app/works/[slug]/page.tsx -> /works/[slug] */
function routeOf(file: string): string {
  const rel = file.slice(join(SRC, "app").length).replace(/\/page\.tsx$/, "");
  return rel === "" ? "/" : rel;
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
  const edges = (f: string) => {
    if (!edgeCache.has(f)) edgeCache.set(f, importsOf(f));
    return edgeCache.get(f)!;
  };

  const usage: Record<string, Set<string>> = {};

  for (const page of pages) {
    const route = routeOf(page);
    if (route === exclude) continue;

    const seen = new Set<string>();
    const queue = [page];
    while (queue.length) {
      const file = queue.pop()!;
      if (seen.has(file)) continue;
      seen.add(file);
      for (const edge of edges(file)) {
        // only count things defined under components/
        if (edge.to.includes(`${SRC}/components`)) {
          for (const name of edge.names) {
            (usage[name] ??= new Set()).add(route);
          }
        }
        queue.push(edge.to);
      }
    }
  }

  // Components pulled in by the root layout apply to every route.
  const layout = join(SRC, "app", "layout.tsx");
  const allRoutes = pages.map(routeOf).filter((r) => r !== exclude).sort();
  try {
    for (const edge of importsOf(layout)) {
      if (!edge.to.includes(`${SRC}/components`)) continue;
      for (const name of edge.names) usage[name] = new Set(allRoutes);
    }
  } catch { /* no layout */ }

  return Object.fromEntries(
    Object.entries(usage).map(([k, v]) => [k, [...v].sort()])
  );
}
