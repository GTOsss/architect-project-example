import { camelCase, upperFirst, kebabCase, lowerFirst } from 'lodash';

export const toCamelCase = (str: string) => {
  return upperFirst(camelCase(str));
};

export const toKebabCase = (str: string) => {
  return kebabCase(str);
};

export const toLowerCamelCase = (str: string) => {
  return lowerFirst(camelCase(str));
};

export { lowerFirst as toLowerFirst, upperCase as toUpperCase, get as getIn } from 'lodash';
