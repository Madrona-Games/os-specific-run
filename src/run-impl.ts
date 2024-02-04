import * as core from '@actions/core';
import * as exec from '@actions/exec';
import { createTemporaryDirectory, getInputAsString } from './action-utils';
import { Inputs, FileExtensions, Shells } from './constants';
import { v4 as uuidV4 } from 'uuid';
import path from 'node:path';
import fs from 'node:fs';
import { formatString } from './string-utils';

export async function Run() {
  try {
    let command = '';
    let unformattedShell = '';

    const temporaryPath = await createTemporaryDirectory();

    let file = path.join(temporaryPath, uuidV4());

    switch (process.platform) {
      case 'linux': {
        command = getInputAsString(Inputs.LinuxCommand);
        unformattedShell = getInputAsString(Inputs.LinuxShell);
        break;
      }
      case 'darwin': {
        command = getInputAsString(Inputs.MacosCommand);
        unformattedShell = getInputAsString(Inputs.MacosShell);
        break;
      }
      case 'win32': {
        command = getInputAsString(Inputs.WindowsCommand);
        unformattedShell = getInputAsString(Inputs.WindowsShell);
        break;
      }
      default: {
        throw new Error(`Unsupported platform: ${process.platform}`);
      }
    }

    const fileExtension = FileExtensions[unformattedShell] ?? '';
    file = file + fileExtension;

    const shell = Shells[unformattedShell] ?? unformattedShell;
    const formattedShell = formatString(shell, file);

    fs.writeFileSync(file, command);

    core.info(`About to run command ${command}`);

    const errorCode = await exec.exec(formattedShell);

    if (errorCode !== 0) {
      core.setFailed(`Failed with error code ${errorCode}`);
    }
  } catch (error) {
    core.setFailed((error as Error).message);
  }
}
