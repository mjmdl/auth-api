export function countDefinedProperties(object: object): number {
  const values = Object.values(object);
  return values.reduce((count, value) => {
    if (value !== undefined) {
      return count + 1;
    }
    return count;
  }, 0);
}
