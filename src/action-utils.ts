import * as core from '@actions/core';
import path from 'node:path';
import { v4 as uuidV4 } from 'uuid';
import * as io from '@actions/io';

export function isGhes(): boolean {
  const ghUrl = new URL(process.env['GITHUB_SERVER_URL'] ?? 'https://github.com');

  return ghUrl.hostname.toUpperCase() !== 'GITHUB.COM';
}

export function logWarning(message: string): void {
  const warningPrefix = '[warning]';
  core.info(`${warningPrefix}${message}`);
}

export function getInputAsArray(name: string, options?: core.InputOptions): string[] {
  return core
    .getInput(name, options)
    .split('\n')
    .map((s) => s.replace(/^!\s+/, '!').trim())
    .filter((x) => x !== '');
}

export function getInputAsInt(name: string, options?: core.InputOptions): number | undefined {
  const value = Number.parseInt(core.getInput(name, options));
  if (Number.isNaN(value) || value < 0) {
    return undefined;
  }

  return value;
}

export function getInputAsBool(name: string, options?: core.InputOptions): boolean {
  const result = core.getInput(name, options);

  return result.toLowerCase() === 'true';
}

export function getInputAsString(name: string, options?: core.InputOptions): string {
  return core.getInput(name, options) ?? '';
}

// From https://github.com/actions/toolkit/blob/main/packages/tool-cache/src/tool-cache.ts#L23
export async function createTemporaryDirectory(): Promise<string> {
  const IS_WINDOWS = process.platform === 'win32';

  let temporaryDirectory: string = process.env['RUNNER_TEMP'] ?? '';

  if (!temporaryDirectory) {
    let baseLocation: string;
    if (IS_WINDOWS) {
      // On Windows use the USERPROFILE env variable
      baseLocation = process.env['USERPROFILE'] ?? 'C:\\';
    } else if (process.platform === 'darwin') {
      baseLocation = '/Users';
    } else {
      baseLocation = '/home';
    }
    temporaryDirectory = path.join(baseLocation, 'actions', 'temp');
  }

  const destination = path.join(temporaryDirectory, uuidV4());
  await io.mkdirP(destination);

  return destination;
}
