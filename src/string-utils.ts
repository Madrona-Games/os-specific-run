export function formatString(shell: string, ...arguments_: any[]) {
  let a = shell;
  let index = 0;

  for (const value of arguments_) {
    a = a.replaceAll(new RegExp(`\\{${index++}\\}`, 'g'), value);
  }

  return a;
}
