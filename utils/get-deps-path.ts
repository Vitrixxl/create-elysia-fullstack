import path from 'path';
import type { AvailableDepencies } from '../installers/dependency-version-map';

export type Paths = {
  templatePath: string;
  destinationDirname: string;
  destinationFilename: string;
};
const basePkgFilePath = path.resolve(import.meta.dir, 'pkg-files');
export const getDepsPaths: (
  appPath: string,
) => Record<AvailableDepencies | string, Paths> = (appPath: string) => {
  const getPkgJsonPath = (app: 'frontend' | 'backend') => {
    return path.resolve(appPath, `apps/${app}/package.json`);
  };
  return {
    'better-auth': {
      pkgJsonFilePath: getPkgJsonPath('backend'),
      templatePath: path.resolve(basePkgFilePath, 'auth.ts'),
      destinationDirname: path.resolve(appPath, 'apps/backend/libs'),
      destinationFilename: 'auth.ts',
    },
    'better-auth-client': {
      pkgJsonFilePath: getPkgJsonPath('frontend'),
      templatePath: path.resolve(basePkgFilePath, 'auth-client.ts'),
      destinationDirname: path.resolve(appPath, 'apps/front/libs/auth'),
      destinationFilename: 'auth-client.ts',
    },
    tr,
    // 'drizzle-orm': {},
    // 'react-query': {},
    // elysia: {},
  };
};
