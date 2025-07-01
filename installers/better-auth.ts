import type { AppConfig } from '..';
import { resolve } from 'path';
import { copyFile } from '../utils/copy-file';
import { addDeps } from '../utils/add-deps';
export const betterAuthInstaller = (appConfig: AppConfig) => {
  const { appDir, choices, rootCliDir } = appConfig;
  return async () => {
    await copyFile(
      resolve(
        rootCliDir,
        'template/back/auth',
        choices.front,
        choices.db == 'sqlite'
          ? 'with-sqlite.ts'
          : choices.db == 'mysql'
          ? 'with-mysql.ts'
          : 'with-postgres.ts',
      ),
      resolve(appDir, 'apps/backend/src/lib/auth'),
      'auth.ts',
    );
    await copyFile(
      resolve(
        rootCliDir,
        'template/front',
        choices.front,
        'auth/auth-client.ts',
      ),
      resolve(appDir, 'apps/react/src/lib/auth'),
      'auth-client.ts',
    );
    await addDeps({ appConfig, app: 'back', dep: 'better-auth' });
    await addDeps({ appConfig, app: 'front', dep: 'better-auth' });
  };
};
