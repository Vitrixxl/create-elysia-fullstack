export const readFileJson = async (path: string) => {
  return await Bun.file(path).json();
};
