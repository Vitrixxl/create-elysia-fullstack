import { mkdir } from 'fs/promises';
import { readdir } from 'fs/promises';
import { resolve } from 'path';
export const copyDir = async (from: string, to: string) => {
  const fileWithPathMap: Record<string, Bun.BunFile> = {};
  const searchDir = async (fromPath: string, toPath: string) => {
    try {
      const content = await readdir(fromPath, { withFileTypes: true });

      for (const el of content) {
        const currentPath = resolve(el.parentPath, el.name);
        if (el.isDirectory()) {
          await mkdir(resolve(toPath, el.name), { recursive: true });
          await searchDir(currentPath, resolve(toPath, el.name));
          continue;
        }
        fileWithPathMap[resolve(toPath, el.name)] = Bun.file(currentPath);
      }
    } catch (error) {
      return [];
    }
  };
  await searchDir(from, to);
  for (const [path, file] of Object.entries(fileWithPathMap)) {
    Bun.write(path, file);
  }
};
