export function formatShell(shell: string, ...arguments_: any[]) {
  let a = shell;
  for (const k of arguments_) {
    a = a.replaceAll(new RegExp(`\\{'${k}'\\}`, 'g'), arguments_[k]);
  }

  return a;
}
