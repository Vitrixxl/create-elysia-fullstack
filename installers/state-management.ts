import type { AppConfig } from '..';
import { resolve } from 'path';
import { copyFile } from '../utils/copy-file';
import { addDeps } from '../utils/add-deps';

export const stateManagementInstaller = (appConfig: AppConfig) => {
  const { appDir, choices, rootCliDir } = appConfig;
  return async () => {
    if (!choices.jotai && !choices.reactQuery) return;
    await copyFile(
      resolve(
        rootCliDir,
        'template/front',
        choices.front,
        'state-management',
        choices.front == 'vite'
          ? choices.reactQuery ? 'main-with-react-query.tsx' : 'main.tsx'
          : choices.jotai && choices.reactQuery
          ? 'layout/with-react-query-jotai.tsx'
          : choices.jotai
          ? 'layout/with-jotai.tsx'
          : 'layout/with-react-query.tsx',
      ),
      resolve(
        appDir,
        choices.front == 'vite' ? 'apps/react/src' : 'apps/react/src/app',
      ),
      choices.front == 'vite' ? 'main.tsx' : 'layout.tsx',
    );
    if (choices.front == 'next' && choices.reactQuery) {
      await copyFile(
        resolve(
          rootCliDir,
          'template/front/next/state-management/query-provider.tsx',
        ),
        resolve(
          appDir,
          'apps/react/src/libs/providers',
        ),
        'query-provider.tsx',
      );
    }
    choices.jotai && addDeps({ appConfig, app: 'front', dep: 'jotai' });
    choices.reactQuery &&
      addDeps({ appConfig, app: 'front', dep: '@tanstack/react-query' });
  };
};
