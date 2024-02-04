/* eslint no-shadow: 0 */
/* eslint no-unused-vars: 0 */

export enum Inputs {
  LinuxCommand = 'linux',
  MacosCommand = 'macos',
  WindowsCommand = 'windows',
  LinuxShell = 'linux-shell',
  MacosShell = 'macos-shell',
  WindowsShell = 'windows-shell',
}

export enum Outputs {}

export const FileExtensions: { [key: string]: string } = {
  cmd: '.cmd',
  pwsh: '.ps1',
  powershell: '.ps1',
};

export const Shells: { [key: string]: string } = {
  bash: 'bash --noprofile --norc -eo pipefail {0}',
  pwsh: 'pwsh -command "& \'{0}\'"',
  python: 'python {0}',
  sh: 'sh -e {0}',
  cmd: 'cmd.exe /D /E:ON /V:OFF /S /C "CALL "{0}""',
  powershell: 'powershell -command "& \'{0}\'"',
  zsh: "zsh -f -c 'set -o pipefail; {0}'",
};
