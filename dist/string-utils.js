"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatShell = void 0;
function formatShell(shell, ...arguments_) {
    let a = shell;
    for (const k of arguments_) {
        a = a.replaceAll(new RegExp(`\\{'${k}'\\}`, 'g'), arguments_[k]);
    }
    return a;
}
exports.formatShell = formatShell;
//# sourceMappingURL=string-utils.js.map