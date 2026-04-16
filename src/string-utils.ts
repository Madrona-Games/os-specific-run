export function formatString(shell: string, ...arguments_: string[]) {
  let a = shell;
  let index = 0;

  for (const value of arguments_) {
    a = a.replaceAll(new RegExp(String.raw`\{${index++}\}`, 'g'), value);
  }

  return a;
}
