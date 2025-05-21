import type { AppConfig } from '..';
import { addDeps } from '../utils/add-deps';
import { copyFile } from '../utils/copy-file';
import { resolve } from 'path';

export const databaseInstaller = (
  appConfig: AppConfig,
) => {
  const { appDir, choices, rootCliDir } = appConfig;
  return async () => {
    await copyFile(
      resolve(
        rootCliDir,
        'template/back/db/index',
        choices.drizzle ? 'drizzle' : '',
        choices.db == 'sqlite'
          ? 'with-sqlite.ts'
          : choices.db == 'mysql'
          ? 'with-mysql.ts'
          : 'with-postgres.ts',
      ),
      resolve(appDir, 'apps/backend/src/libs/db'),
      'index.ts',
    );
    if (choices.drizzle) {
      await copyFile(
        resolve(
          rootCliDir,
          'template/back/db/schema',
          choices.db == 'sqlite'
            ? 'with-sqlite.ts'
            : choices.db == 'mysql'
            ? 'with-mysql.ts'
            : 'with-postgres.ts',
        ),
        resolve(appDir, 'apps/backend/src/libs/db'),
        'schema.ts',
      );
      await addDeps({ appConfig, app: 'back', dep: 'drizzle-orm' });
    }
    if (choices.db == 'mysql') {
      await addDeps({ appConfig, app: 'back', dep: 'mysql2' });
    }
  };
};
