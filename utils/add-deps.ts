import type { AppConfig } from '..';
import { resolve } from 'path';
import {
  type AvailableDepencies,
  dependencyVersions,
} from '../installers/dependency-version-map';
import { readFileJson } from './read-json';

type AddDepsOption = {
  appConfig: AppConfig;
  app: 'front' | 'back';
  dep: AvailableDepencies;
};
export const addDeps = async ({ appConfig, dep, app }: AddDepsOption) => {
  const path = resolve(
    appConfig.appDir,
    'apps',
    app == 'back' ? 'backend' : 'react',
    'package.json',
  );
  const pkgJson = await readFileJson(
    path,
  );
  pkgJson.dependencies[dep] = dependencyVersions[dep];
  Bun.write(path, JSON.stringify(pkgJson, null, 2));
};
