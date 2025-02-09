import { createGeneratorStrByTemplate, HelpAPI } from 'architect-project';
import { Config, ParameterInEnum, toArrayMethods, toArrayTypes } from 'architect-project-plugin-open-api';
import { OpenAPIV3 } from 'openapi-types';
import { camelCase, upperFirst, toUpper } from 'lodash';

export const genCode = createGeneratorStrByTemplate({ itrStart: '->', itrEnd: '<-' });

const effectTemplate = `
// #################### ->methodCaps<- ->path<- ####################

export type ->methodParametersTypeName<- = {
  ->paramsTypeFields<-
}

/**
* ->methodCaps<- ->path<- 
* */ 
export const ->methodName<- = createEffect(async ({ ->params<- }: ->methodParametersTypeName<-) => {
  return await api.->method<-
   <
     ->resultTypeName<-
   >(
    urls.->methodName<-(->urlGetterArg<-),
    ->secondArgument<-
  );
});
` as const;

const config: Config = {
  typesMap: {
    number: 'number',
    string: 'string',
    anyObject: 'AnyObject',
    integer: 'number',
    boolean: 'boolean',
    '*': 'unknown',
  },
};

const getSwaggerSpec = ({ serviceName, specFileSourceName }): OpenAPIV3.Document => {
  return require(`../../data/${serviceName}/${specFileSourceName}.json`);
};

export const getCommonTypes = (_: unknown, { templateParams }: HelpAPI) => {
  const swaggerSpec = getSwaggerSpec(templateParams);
  return toArrayTypes(swaggerSpec, config)
    .map(({ typeValue, typeName }) => `export type ${typeName} = ${typeValue}`)
    .join('\n');
};

export const getMethods = (_: unknown, { templateParams }: HelpAPI) => {
  const swaggerSpec = getSwaggerSpec(templateParams);

  const methods = toArrayMethods(swaggerSpec, config);

  return methods
    .map(({ method, parametersMap, responseType, requestBodyType, path, generatedMethodName }) => {
      /**
       * Хранит одно из двух:
       * - Список полей и типов в формате: 'userId: number, groupId: number'
       * Или
       * - пустую строку: ''
       * */
      const urlParamsTypes = parametersMap[ParameterInEnum.path]
        .map((urlParameter) => `${urlParameter.name}: ${urlParameter.type}`)
        .filter(Boolean)
        .join(',');

      /**
       * Хранит одно из двух:
       * - Список полей и типов в формате: 'userId: number, groupId: number'
       * Или
       * - пустую строку: ''
       * */
      const queryParamsTypes = parametersMap[ParameterInEnum.query]
        .map((queryParameter) => `${queryParameter.name}: ${queryParameter.type}`)
        .filter(Boolean)
        .join(',');

      const paramsTypeFields = [
        urlParamsTypes ? `urlParams: { ${urlParamsTypes} }` : '',
        queryParamsTypes ? `queryParams: { ${queryParamsTypes} }` : '',
        requestBodyType ? `data: ${requestBodyType}` : '',
      ]
        .filter(Boolean)
        .join();

      const paramsFields = [
        urlParamsTypes ? 'urlParams' : '',
        queryParamsTypes ? 'queryParams' : '',
        requestBodyType ? 'data' : '',
      ]
        .filter(Boolean)
        .join();

      const methodParametersTypeName = [upperFirst(method), upperFirst(camelCase(generatedMethodName)), 'Params'].join(
        '',
      );

      let secondArgument = '';

      if (method === 'get') {
        // Могут быть query параметры
        secondArgument = queryParamsTypes ? '{ query: queryParams }' : '';
      } else {
        // В этом блоке else не бывает query параметров, вместо него body
        secondArgument = requestBodyType ? 'data' : '';
      }

      return genCode(effectTemplate, {
        method,
        methodCaps: toUpper(method),
        path,
        methodName: `${method}${upperFirst(generatedMethodName)}`,
        params: paramsFields,
        methodParametersTypeName,
        resultTypeName: responseType,
        urlGetterArg: urlParamsTypes ? 'urlParams' : '',
        paramsTypeFields,
        secondArgument,
      });
    })
    .join('\n\n');
};

export const getURLGetters = (_: unknown, { templateParams }: HelpAPI) => {
  const swaggerSpec = getSwaggerSpec(templateParams);
  const methods = toArrayMethods(swaggerSpec, config);
  return Array.from(new Set(methods.map(({ urlGetter }) => `export const ${urlGetter}`))).join(';\n');
};

export const getCommonTypeNames = (_: unknown, { templateParams }: HelpAPI) => {
  const swaggerSpec = getSwaggerSpec(templateParams);

  return toArrayTypes(swaggerSpec, config)
    .map(({ typeName }) => typeName)
    .join();
};
