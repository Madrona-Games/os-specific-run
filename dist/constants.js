"use strict";
/* eslint no-shadow: 0 */
/* eslint no-unused-vars: 0 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shells = exports.FileExtensions = exports.Outputs = exports.Inputs = void 0;
var Inputs;
(function (Inputs) {
    Inputs["LinuxCommand"] = "linux";
    Inputs["MacosCommand"] = "macos";
    Inputs["WindowsCommand"] = "windows";
    Inputs["LinuxShell"] = "linux-shell";
    Inputs["MacosShell"] = "macos-shell";
    Inputs["WindowsShell"] = "windows-shell";
})(Inputs || (exports.Inputs = Inputs = {}));
var Outputs;
(function (Outputs) {
})(Outputs || (exports.Outputs = Outputs = {}));
exports.FileExtensions = {
    cmd: '.cmd',
    pwsh: '.ps1',
    powershell: '.ps1',
};
exports.Shells = {
    bash: 'bash --noprofile --norc -eo pipefail {0}',
    pwsh: 'pwsh -command "& \'{0}\'"',
    python: 'python {0}',
    sh: 'sh -e {0}',
    cmd: 'cmd.exe /D /E:ON /V:OFF /S /C "CALL "{0}""',
    powershell: 'powershell -command "& \'{0}\'"',
    zsh: "zsh -f -c 'set -o pipefail; {0}'",
};
//# sourceMappingURL=constants.js.map