import type { AppConfig } from '..';
import { readFileJson } from './read-json';
import { resolve } from 'path';

export const renameApp = async ({ appDir, appName }: AppConfig) => {
  console.log(appDir);
  const reactPkgJsonPath = resolve(appDir, 'apps/react/package.json');
  const elysiaPkgJsonPath = resolve(appDir, 'apps/react/package.json');
  const reactPkgJson = await readFileJson(
    reactPkgJsonPath,
  );
  const elysiaPkgJson = await readFileJson(
    elysiaPkgJsonPath,
  );
  reactPkgJson.name = `@${appName}/react`;
  elysiaPkgJson.name = `@${appName}/backend`;
  await Bun.write(reactPkgJsonPath, JSON.stringify(reactPkgJson, null, 2));
  await Bun.write(elysiaPkgJsonPath, JSON.stringify(elysiaPkgJson, null, 2));
};
