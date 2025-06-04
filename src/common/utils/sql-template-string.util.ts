function sql(strings: TemplateStringsArray, ...values: any[]) {
  return values.reduce(
    (result, value, index) => (result += value + strings[index + 1]),
    strings[0],
  );
}

(() => (globalThis.sql = sql))();
