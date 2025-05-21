import path from 'path';
import type { AvailableDepencies } from '../installers/dependency-version-map';

type Paths = {
  templatePath: string;
  destination: string;
};
const basePkgFilePath = path.resolve(import.meta.dir, 'pkg-files');
export const getDepsPaths: (
  appPath: string,
) => Record<AvailableDepencies, Paths> = (appPath: string) => ({
  'better-auth': {
    templatePath: path.resolve(basePkgFilePath, 'auth.ts'),
    destination: path.resolve(appPath, 'auth.ts'),
  },
  'drizzle-orm': {},
  'react-query': {},
  elysia: {},
});
