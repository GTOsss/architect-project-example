import axios from 'axios';
import { join } from 'path';
import { outputJSON } from 'fs-extra';

const request = axios.create({
  baseURL: 'https://url-to-open-api-json',
});

const loadFile = async () => {
  const { data } = await request.get('/v3/api-docs');
  const swaggerJsonPath = '/architect/data/main/';
  const outputPath = join(process.cwd(), swaggerJsonPath, 'swagger.json');
  await outputJSON(outputPath, data);
  console.log('Файл получен и сохранен:\n', outputPath);
};

loadFile();
