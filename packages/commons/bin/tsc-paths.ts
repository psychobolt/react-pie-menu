/*
 * (Experimental) Remove alias and restore relative path for project modules in `*.d.ts` emitted files.
 *
 * Co-authored-by:
 * @author GitHub Copilot
 */
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import arg from 'arg';
import chokidar from 'chokidar';
import debounce from 'lodash/debounce.js';

const fsp = fs.promises;

type Paths = Record<string, string[]>;

// Cache for filesystem existence checks and computed replacements
const existsCache = new Map<string, boolean>();
const replacementCache = new Map<string, string | null>();

type CompiledPath = { key: string; regex: RegExp; targets: string[] };
let compiledPaths: CompiledPath[] = [];

function escapeForRegex(s: string) {
  return s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function wildcardToRegex(pattern: string): RegExp {
  // Convert tsconfig-style wildcard pattern (may contain *) into a capturing RegExp
  // Escape metachars then replace escaped '*' with '(.*)'.
  const esc = escapeForRegex(pattern);
  const replaced = esc.replace(/\\\*/g, '(.*)');
  return new RegExp('^' + replaced + '$');
}

function ensurePosix(p: string) {
  return p.split(path.sep).join('/');
}

async function walk(dir: string, cb: (file: string) => Promise<void>) {
  try {
    const entries = await fsp.readdir(dir, { withFileTypes: true });
    await Promise.all(
      entries.map(async (e) => {
        const full = path.join(dir, e.name);
        if (e.isDirectory()) return walk(full, cb);
        await cb(full);
      })
    );
  } catch (e) {
    // ignore missing/unreadable directories
  }
}

function resolveTargetExists(resolved: string): boolean {
  const candidates = [
    resolved,
    resolved + '.d.ts',
    resolved + '.ts',
    resolved + '.tsx',
    resolved + '.js',
    resolved + '.jsx',
    path.join(resolved, 'index.d.ts'),
    path.join(resolved, 'index.ts'),
    path.join(resolved, 'index.tsx'),
    path.join(resolved, 'index.js')
  ];
  return candidates.some((p) => {
    const cached = existsCache.get(p);
    if (cached !== undefined) return cached;
    const exists = fs.existsSync(p);
    existsCache.set(p, exists);
    return exists;
  });
}

function makeReplacement(
  specifier: string,
  fileDir: string,
  tsconfigDir: string,
  rootDir: string | undefined,
  outDir: string | undefined
): string | null {
  if (!compiledPaths.length) return null;
  if (specifier.startsWith('.') || specifier.startsWith('/')) return null;

  const cacheKey = `${fileDir}::${specifier}`;
  if (replacementCache.has(cacheKey)) {
    return replacementCache.get(cacheKey) || null;
  }

  for (const entry of compiledPaths) {
    const m = specifier.match(entry.regex);
    if (!m) continue;

    const targets = entry.targets;
    for (const target of targets) {
      // substitute wildcard groups into target
      let replaced = target;
      const stars = (target.match(/\*/g) || []).length;
      for (let i = 0; i < stars; i++) {
        replaced = replaced.replace('*', m[i + 1] || '');
      }

      const resolvedSource = path.resolve(tsconfigDir, replaced);

      // map source -> out path if outDir/rootDir present
      let resolvedOut = resolvedSource;
      if (outDir) {
        const rootBase = rootDir
          ? path.resolve(tsconfigDir, rootDir)
          : tsconfigDir;
        const rel = path.relative(rootBase, resolvedSource);
        if (rel.startsWith('..')) continue; // not within rootDir
        resolvedOut = path.resolve(outDir, rel);
      }

      if (!resolveTargetExists(resolvedOut)) continue;

      const withoutExt = resolvedOut.replace(/(\.(ts|tsx|js|jsx|d\.ts))$/i, '');
      let relSpec = ensurePosix(path.relative(fileDir, withoutExt));
      if (!relSpec.startsWith('.')) relSpec = './' + relSpec;
      replacementCache.set(cacheKey, relSpec);
      return relSpec;
    }
  }
  replacementCache.set(cacheKey, null);
  return null;
}

async function main() {
  const args = arg(
    {
      '--project': String,
      '-p': '--project',
      '--watch': Boolean,
      '-w': '--watch'
    },
    { argv: process.argv.slice(2) }
  );

  const tsconfigPath = args['--project'];
  if (!tsconfigPath) {
    console.error('Error: --project <path> is required');
    process.exit(1);
  }
  if (!fs.existsSync(tsconfigPath)) {
    console.error('Error: tsconfig not found at', tsconfigPath);
    process.exit(1);
  }

  const tsconfigDir = path.dirname(tsconfigPath);
  const read = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
  if (read.error) {
    console.error('Failed to read tsconfig:', read.error);
    process.exit(1);
  }
  const parsed = ts.parseJsonConfigFileContent(
    read.config,
    ts.sys,
    tsconfigDir
  );
  const compilerOptions = parsed.options;
  const paths: Paths | undefined = compilerOptions.paths;
  const outDir: string | undefined = compilerOptions.outDir
    ? path.resolve(tsconfigDir, compilerOptions.outDir)
    : undefined;
  const rootDir: string | undefined = compilerOptions.rootDir
    ? path.resolve(tsconfigDir, compilerOptions.rootDir)
    : undefined;

  if (!paths) {
    console.error('No `paths` in tsconfig — nothing to do.');
    process.exit(0);
  }

  // Precompile path keys into regexes to avoid recompiling per-specifier
  compiledPaths = Object.keys(paths)
    .sort((a, b) => b.length - a.length)
    .map((k) => ({ key: k, regex: wildcardToRegex(k), targets: paths[k] }));

  const targetDir = outDir || tsconfigDir;
  const files: string[] = [];
  await walk(targetDir, async (file) => {
    if (file.endsWith('.d.ts')) files.push(file);
  });

  const pattern =
    /(from\s+['"]([^'"]+)['"])|(import\(\s*['"]([^'"]+)['"]\s*\))/g;
  async function processFile(file: string) {
    try {
      const content = String(await fsp.readFile(file, 'utf8'));
      const fileDir = path.dirname(file);
      let changed = false;
      const newContent = content.replace(pattern, (match, p1, p2, _, p4) => {
        const spec = p2 || p4;
        if (!spec) return match;
        const replacement = makeReplacement(
          spec,
          fileDir,
          tsconfigDir,
          rootDir,
          outDir
        );
        if (replacement) {
          changed = true;
          if (p1) return `from '${replacement}'`;
          return `import('${replacement}')`;
        }
        return match;
      });
      if (changed) await fsp.writeFile(file, newContent, 'utf8');
    } catch (e) {
      console.error('Failed processing', file, e);
    }
  }

  // initial run
  for (const file of files) await processFile(file);

  if (args['--watch']) {
    console.log('Watching', targetDir);
    const changedFiles = new Set<string>();
    const flush = debounce(async () => {
      const toProcess = Array.from(changedFiles);
      changedFiles.clear();
      // clear replacement cache to be safe when files change
      replacementCache.clear();
      for (const f of toProcess) await processFile(f);
    }, 100);

    const watcher = chokidar.watch(targetDir, {
      ignored: /node_modules/, // ignore node_modules
      ignoreInitial: true,
      awaitWriteFinish: { stabilityThreshold: 100, pollInterval: 10 }
    });

    watcher.on('add', (p) => {
      if (p.endsWith('.d.ts')) {
        changedFiles.add(p);
        flush();
      }
    });
    watcher.on('change', (p) => {
      if (p.endsWith('.d.ts')) {
        changedFiles.add(p);
        flush();
      }
    });
    watcher.on('unlink', (p) => {
      if (p.endsWith('.d.ts')) {
        changedFiles.add(p);
        flush();
      }
    });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
