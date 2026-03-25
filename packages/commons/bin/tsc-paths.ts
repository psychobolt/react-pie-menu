/*
 * Co-authored-by:
 * @author GitHub Copilot
 */
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import arg from 'arg';

const fsp = fs.promises;

type Paths = Record<string, string[]>;

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
  return candidates.some((p) => fs.existsSync(p));
}

function makeReplacement(
  specifier: string,
  fileDir: string,
  tsconfigDir: string,
  paths: Paths | undefined,
  rootDir: string | undefined,
  outDir: string | undefined
): string | null {
  if (!paths) return null;
  if (specifier.startsWith('.') || specifier.startsWith('/')) return null;

  const keys = Object.keys(paths).sort((a, b) => b.length - a.length);
  for (const key of keys) {
    const regex = wildcardToRegex(key);
    const m = specifier.match(regex);
    if (!m) continue;

    const targets = paths[key];
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
      return relSpec;
    }
  }
  return null;
}

async function main() {
  const args = arg(
    {
      '--project': String,
      '-p': '--project'
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

  const targetDir = outDir || tsconfigDir;
  const files: string[] = [];
  await walk(targetDir, async (file) => {
    if (file.endsWith('.d.ts')) files.push(file);
  });

  for (const file of files) {
    const content = String(await fsp.readFile(file, 'utf8'));
    const fileDir = path.dirname(file);
    let changed = false;

    const pattern =
      /(from\s+['"]([^'"]+)['"])|(import\(\s*['"]([^'"]+)['"]\s*\))/g;
    const newContent = content.replace(pattern, (match, p1, p2, _, p4) => {
      const spec = p2 || p4;
      if (!spec) return match;
      const replacement = makeReplacement(
        spec,
        fileDir,
        tsconfigDir,
        paths,
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

    if (changed) {
      await fsp.writeFile(file, newContent, 'utf8');
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
