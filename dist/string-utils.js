"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatString = void 0;
function formatString(shell, ...arguments_) {
    let a = shell;
    let index = 0;
    for (const value of arguments_) {
        a = a.replaceAll(new RegExp(`\\{${index++}\\}`, 'g'), value);
    }
    return a;
}
exports.formatString = formatString;
//# sourceMappingURL=string-utils.js.map