import * as esbuild from 'esbuild';
import * as fs from 'node:fs';
import * as path from 'node:path';

/**
 * Extracts license information from bundled packages using esbuild's metafile
 * and writes a licenses.txt file to the output directory.
 */
function extractLicenses(metafile, outdir) {
  const packages = new Map();

  for (const inputPath of Object.keys(metafile.inputs)) {
    const match = new RegExp(/^node_modules\/(@[^/]+\/[^/]+|[^/]+)/).exec(inputPath);
    if (match) {
      packages.set(match[1], true);
    }
  }

  const licenseEntries = [];

  for (const packageName of [...packages.keys()].sort()) {
    const packageDir = path.join('node_modules', packageName);
    let licenseType = 'Unknown';
    let licenseText = '';

    // Read package.json for license field
    try {
      const packageJson = JSON.parse(
        fs.readFileSync(path.join(packageDir, 'package.json'), 'utf-8'),
      );
      licenseType = packageJson.license || 'Unknown';
    } catch {
      // package.json not found or unreadable
    }

    // Try to find a LICENSE file
    const licenseFileNames = [
      'LICENSE',
      'LICENSE.md',
      'LICENSE.txt',
      'LICENCE',
      'LICENCE.md',
      'LICENCE.txt',
      'license',
      'license.md',
      'license.txt',
    ];

    for (const fileName of licenseFileNames) {
      try {
        licenseText = fs.readFileSync(path.join(packageDir, fileName), 'utf-8').trim();
        break;
      } catch {
        // Try next filename
      }
    }

    licenseEntries.push(`${packageName}\n${licenseType}\n${licenseText ? `\n${licenseText}` : ''}`);
  }

  if (licenseEntries.length > 0) {
    fs.mkdirSync(outdir, { recursive: true });
    fs.writeFileSync(path.join(outdir, 'licenses.txt'), licenseEntries.join('\n\n---\n\n') + '\n');
  }
}

// 1. Clean dist directory
fs.rmSync('dist', { recursive: true, force: true });

// 2. Build the bundle
const outdir = 'dist';

const result = await esbuild.build({
  entryPoints: ['src/run.ts'],
  bundle: true,
  platform: 'node',
  target: 'node24',
  format: 'cjs',
  minify: true,
  sourcemap: true,
  outdir,
  outbase: '.',
  metafile: true,
  entryNames: 'index',
});

extractLicenses(result.metafile, outdir);
