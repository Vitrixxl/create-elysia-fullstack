#!/usr/bin/env bun

import ora from 'ora';
import prompts from 'prompts';
import { createProject } from './helpers/create-project';

export type AppConfig = {
  appName: string;
  appDir: string;
  front: 'next' | 'vite';
  choices: AppChoices;
  rootCliDir: string;
};

export type AppChoices = {
  appName: string;
  auth: boolean;
  treaty: boolean;
  db: 'postgres' | 'mysql' | 'sqlite';
  drizzle: boolean;
  // redis: boolean;
  front: 'next' | 'vite';
  shadcn: boolean;
  reactQuery: boolean;
  jotai: boolean;
};

const appChoices: AppChoices = await prompts([
  {
    name: 'appName',
    type: 'text',
    message: 'What will be your app name ?',
    initial: 'app',
  },
  {
    name: 'auth',
    type: 'confirm',
    message: 'Would you like to use better-auth ?',
    initial: true,
  },
  {
    name: 'treaty',
    type: 'confirm',
    message: 'Would you like to use treaty ?',
    initial: true,
  },
  {
    name: 'db',
    type: 'select',
    message: 'Which database do you wanna use ?',
    choices: [
      { title: 'PostgreSQL', value: 'postgres' },
      { title: 'MySQL', value: 'mysql' },
      { title: 'SQLite', value: 'sqlite' },
    ],
  },
  {
    name: 'drizzle',
    type: 'confirm',
    message: 'Would you like to use drizzle-orm',
    initial: true,
  },
  // {
  //   name: 'redis',
  //   type: 'confirm',
  //   message: 'Would you like to use redis ?',
  //   initial: true,
  // },
  {
    name: 'front',
    type: 'select',
    message: 'What do you prefer for the front-end',
    choices: [{ title: 'Next JS', value: 'next' }, {
      title: 'Vite',
      value: 'vite',
    }],
  },
  {
    name: 'shadcn',
    type: 'confirm',
    message: 'Would you like to use shadcn ?',
    initial: true,
  },
  {
    name: 'reactQuery',
    type: 'confirm',
    message: 'Would you like to use React-Query ?',
    initial: true,
  },
  {
    name: 'jotai',
    type: 'confirm',
    message: 'Would you like to use jotai as global state management',
    initial: true,
  },
]);

const spinner = ora(`Init project`).start();

await createProject({ choices: appChoices, rootCliDir: import.meta.dir });

spinner.stop();
console.log('Everything is setup correctly');
