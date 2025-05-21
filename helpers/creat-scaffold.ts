import type { AppConfig } from '../index.ts';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'path';
import { copyDir } from '../utils/copy-dir.ts';
export const createScaffold = async (
  { appDir, front, rootCliDir }: AppConfig,
) => {
  await mkdir(appDir, { recursive: true });
  await copyDir(resolve(rootCliDir, 'template', 'base'), appDir);
  await mkdir(resolve(appDir, 'apps/react'), { recursive: true });
  await copyDir(
    resolve(rootCliDir, 'template/front', front, 'base'),
    resolve(appDir, 'apps', 'react'),
  );
};
