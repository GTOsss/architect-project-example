import { ArcConfig } from 'architect-project';

export const config: ArcConfig = {
  esLint: { configFile: 'eslint.config.mjs', autofix: true },
  output: './',
  replace: false,
  clean: false,
  watch: false,
  backup: false,
  itrStart: '#',
  itrEnd: '#',
  itrFileNameStart: '[',
  itrFileNameEnd: ']',
  templateExt: '.txt',
  templates: {
    ['store-root']: {
      clean: false,
      replace: true,
    },
    ['index']: {
      replace: true,
    },
    ['component']: {
      watch: false,
      replace: false,
      backup: false,
    },
    ['api']: {
      replace: true,
      watch: false,
    },
    ['api-v2']: {
      replace: true,
      watch: false,
    },
  },
};
