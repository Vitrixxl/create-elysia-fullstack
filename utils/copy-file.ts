import { mkdir } from 'fs/promises';
import { resolve } from 'path';

export const copyFile = async (
  from: string,
  toDir: string,
  toFilename: string,
) => {
  mkdir(toDir, { recursive: true });
  await Bun.write(resolve(toDir, toFilename), Bun.file(from));
};
