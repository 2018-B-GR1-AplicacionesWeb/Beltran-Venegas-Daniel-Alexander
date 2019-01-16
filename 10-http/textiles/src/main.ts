import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//const http_server=require('http-server');
//import {} from 'http-server';
import * as httpserver from 'http-server';
console.log(httpserver);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
