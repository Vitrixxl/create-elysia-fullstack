import { AppConfig } from '..';
import { resolve } from 'path';
import { copyFile } from '../utils/copy-file';

export const shadcnInstaller = (appConfig: AppConfig) => {
  const { appDir, choices, rootCliDir } = appConfig;
  return async () => {
    await copyFile(
      resolve(
        rootCliDir,
        'template/front',
        choices.front,
        'shadcn/components.json',
      ),
      resolve(appDir, 'apps/react/src'),
      'components.json',
    );
    await copyFile(
      resolve(
        rootCliDir,
        'template/front',
        choices.front,
        'shadcn/utils.ts.json',
      ),
      resolve(appDir, 'apps/react/src'),
      'utils.ts.json',
    );
  };
};
