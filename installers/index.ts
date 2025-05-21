import { treatyInstaller } from './treaty';

import { stateManagementInstaller } from './state-management';
import { betterAuthInstaller } from './better-auth';
import { mkdir } from 'fs/promises';
import type { AvailableDepencies } from './dependency-version-map';
import { databaseInstaller } from './database';
import { resolve } from 'path';
import type { AppConfig } from '..';

export type InstallerConext = {
  appPath: string;
  front: 'vite' | 'next';
  database: DatabaseProvider;
};

export const databaseProviders = [
  'mysql',
  'postgres',
  'sqlite',
] as const;

export type DatabaseProvider = (typeof databaseProviders)[number];

export type Installer = () => Promise<void>;

export const buildPkgInstallerMap = (
  appConfig: AppConfig,
) => {
  const { choices } = appConfig;
  const map: Record<
    Exclude<AvailableDepencies, 'mysql2'>,
    { inUse: boolean; installer: Installer }
  > = {
    '@elysiajs/eden': {
      inUse: choices.treaty,
      installer: treatyInstaller(appConfig),
    },
    '@tanstack/react-query': {
      inUse: choices.reactQuery,
      installer: stateManagementInstaller(appConfig),
    },
    'better-auth': {
      inUse: choices.auth,
      installer: betterAuthInstaller(appConfig),
    },
    'drizzle-orm': {
      inUse: choices.drizzle,
      installer: databaseInstaller(appConfig),
    },
    jotai: {
      inUse: choices.jotai,
      installer: stateManagementInstaller(appConfig),
    },
  };

  return map;
};
