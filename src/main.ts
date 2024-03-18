import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {register, collectDefaultMetrics} from 'prom-client'
import { setupGracefulShutdown } from 'nestjs-graceful-shutdown';
import * as dotenv from 'dotenv';


async function bootstrap() {

  const envFileName = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
  dotenv.config({ path: envFileName });

  const app = await NestFactory.create(AppModule);
  collectDefaultMetrics();

  const config = new DocumentBuilder()
    .setTitle('Domain Resolver example')
    .setDescription('Domain Resolver API description')
    .setVersion('1.0')
    .addTag('Domain Resolver')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  setupGracefulShutdown({ app });

  await app.listen(3000);
}
bootstrap();
