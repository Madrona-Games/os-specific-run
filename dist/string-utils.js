"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatString = formatString;
function formatString(shell, ...arguments_) {
    let a = shell;
    let index = 0;
    for (const value of arguments_) {
        a = a.replaceAll(new RegExp(`\\{${index++}\\}`, 'g'), value);
    }
    return a;
}
//# sourceMappingURL=string-utils.js.map