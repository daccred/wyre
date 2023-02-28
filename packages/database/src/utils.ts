export function exclude<T, Key extends keyof T>(
  fields: T,
  keys: Key[]
): Omit<T, Key> {
  for (const key of keys) {
    delete fields[key];
  }
  return fields;
}
