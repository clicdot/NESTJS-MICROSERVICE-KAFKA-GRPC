import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path'; //
console.log(join(__dirname, '../src/tester/auth.proto'));
export async function start() {
  const app = await NestFactory.create(
    AppModule,
    new FastifyAdapter({
      logger: true
    })
  );

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['kafka:29092']
      },
      consumer: {
        groupId: 'billing-consumer'
      }
    }
  });

  await app.startAllMicroservices();

  app.useLogger(app.get(Logger));

  app.get(ConfigService);

  app.enableShutdownHooks();

  return app;
}
