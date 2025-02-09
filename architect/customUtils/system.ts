export const clearRequireCash = (path: string) => {
  delete require.cache[path];
  delete require.cache[`${path}.ts`];
  delete require.cache[`${path}.js`];
  delete require.cache[`${path}.cjs`];
};

export const requireWithoutCache = <T>(path: string): T => {
  clearRequireCash(path);
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require(path);
};
