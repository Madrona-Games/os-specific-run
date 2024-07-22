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
exports.isGhes = isGhes;
exports.logWarning = logWarning;
exports.getInputAsArray = getInputAsArray;
exports.getInputAsInt = getInputAsInt;
exports.getInputAsBool = getInputAsBool;
exports.getInputAsString = getInputAsString;
exports.createTemporaryDirectory = createTemporaryDirectory;
const core = __importStar(require("@actions/core"));
const node_path_1 = __importDefault(require("node:path"));
const uuid_1 = require("uuid");
const io = __importStar(require("@actions/io"));
function isGhes() {
    const ghUrl = new URL(process.env['GITHUB_SERVER_URL'] ?? 'https://github.com');
    return ghUrl.hostname.toUpperCase() !== 'GITHUB.COM';
}
function logWarning(message) {
    const warningPrefix = '[warning]';
    core.info(`${warningPrefix}${message}`);
}
function getInputAsArray(name, options) {
    return core
        .getInput(name, options)
        .split('\n')
        .map((s) => s.replace(/^!\s+/, '!').trim())
        .filter((x) => x !== '');
}
function getInputAsInt(name, options) {
    const value = Number.parseInt(core.getInput(name, options));
    if (Number.isNaN(value) || value < 0) {
        return undefined;
    }
    return value;
}
function getInputAsBool(name, options) {
    const result = core.getInput(name, options);
    return result.toLowerCase() === 'true';
}
function getInputAsString(name, options) {
    return core.getInput(name, options) ?? '';
}
// From https://github.com/actions/toolkit/blob/main/packages/tool-cache/src/tool-cache.ts#L23
async function createTemporaryDirectory() {
    const IS_WINDOWS = process.platform === 'win32';
    let temporaryDirectory = process.env['RUNNER_TEMP'] ?? '';
    if (!temporaryDirectory) {
        let baseLocation;
        if (IS_WINDOWS) {
            // On Windows use the USERPROFILE env variable
            baseLocation = process.env['USERPROFILE'] ?? 'C:\\';
        }
        else if (process.platform === 'darwin') {
            baseLocation = '/Users';
        }
        else {
            baseLocation = '/home';
        }
        temporaryDirectory = node_path_1.default.join(baseLocation, 'actions', 'temp');
    }
    const destination = node_path_1.default.join(temporaryDirectory, (0, uuid_1.v4)());
    await io.mkdirP(destination);
    return destination;
}
//# sourceMappingURL=action-utils.js.map