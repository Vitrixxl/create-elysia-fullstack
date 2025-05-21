import type { AppConfig } from '..';
import { createScaffold } from './creat-scaffold';
import path from 'path';
import { buildPkgInstallerMap } from '../installers';

export const createProject = async (
  { choices, rootCliDir }: Pick<AppConfig, 'choices' | 'rootCliDir'>,
) => {
  const appConfig: AppConfig = {
    appName: choices.appName,
    appDir: path.resolve(process.cwd(), choices.appName),
    front: choices.front,
    choices,
    rootCliDir,
  };
  await createScaffold(appConfig);

  const pkgInstallerMap = buildPkgInstallerMap(appConfig);

  for (const [_, { inUse, installer }] of Object.entries(pkgInstallerMap)) {
    if (!inUse) return;
    await installer();
  }
};
