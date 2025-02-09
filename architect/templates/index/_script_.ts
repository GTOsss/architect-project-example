import { CustomTemplateFunction } from 'architect-project';

const indexRowTemplate = (fileName: string) => `export * from './${fileName}';`;

export const getIndexRows: CustomTemplateFunction = (_, { sourceMap, templateParams }) => {
  return Object.values(sourceMap[templateParams.outputPath])
    .map(({ name }: any) => name)
    .filter((str) => templateParams.name !== str)
    .map(indexRowTemplate)
    .join('\n');
};
