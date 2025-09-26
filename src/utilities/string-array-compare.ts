export function stringArrayCompare(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  if (a === b) return true;

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
