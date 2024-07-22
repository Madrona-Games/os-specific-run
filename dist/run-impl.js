"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Run = Run;
const core = __importStar(require("@actions/core"));
const exec = __importStar(require("@actions/exec"));
const action_utils_1 = require("./action-utils");
const constants_1 = require("./constants");
const uuid_1 = require("uuid");
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
const string_utils_1 = require("./string-utils");
async function Run() {
    try {
        let command = '';
        let unformattedShell = '';
        const temporaryPath = await (0, action_utils_1.createTemporaryDirectory)();
        let file = node_path_1.default.join(temporaryPath, (0, uuid_1.v4)());
        switch (process.platform) {
            case 'linux': {
                command = (0, action_utils_1.getInputAsString)(constants_1.Inputs.LinuxCommand);
                unformattedShell = (0, action_utils_1.getInputAsString)(constants_1.Inputs.LinuxShell);
                break;
            }
            case 'darwin': {
                command = (0, action_utils_1.getInputAsString)(constants_1.Inputs.MacosCommand);
                unformattedShell = (0, action_utils_1.getInputAsString)(constants_1.Inputs.MacosShell);
                break;
            }
            case 'win32': {
                command = (0, action_utils_1.getInputAsString)(constants_1.Inputs.WindowsCommand);
                unformattedShell = (0, action_utils_1.getInputAsString)(constants_1.Inputs.WindowsShell);
                break;
            }
            default: {
                throw new Error(`Unsupported platform: ${process.platform}`);
            }
        }
        const fileExtension = constants_1.FileExtensions[unformattedShell] ?? '';
        file = file + fileExtension;
        const shell = constants_1.Shells[unformattedShell] ?? unformattedShell;
        const formattedShell = (0, string_utils_1.formatString)(shell, file);
        node_fs_1.default.writeFileSync(file, command);
        core.info(`About to run command ${command}`);
        const errorCode = await exec.exec(formattedShell);
        if (errorCode !== 0) {
            core.setFailed(`Failed with error code ${errorCode}`);
        }
    }
    catch (error) {
        core.setFailed(error.message);
    }
}
//# sourceMappingURL=run-impl.js.map