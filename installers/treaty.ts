import type { AppConfig } from '..';
import { resolve } from 'path';
import { copyFile } from '../utils/copy-file';
import { addDeps } from '../utils/add-deps';

export const treatyInstaller = (appConfig: AppConfig) => {
  const { appDir, choices, rootCliDir } = appConfig;
  return async () => {
    await copyFile(
      resolve(
        rootCliDir,
        'template/front',
        choices.front,
        'treaty',
        'index.ts',
      ),
      resolve(appDir, 'apps/react/src/libs/api'),
      'index.ts',
    );
    await addDeps({ appConfig, app: 'front', dep: '@elysiajs/eden' });
  };
};
