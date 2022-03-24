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
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:8877',
      package: 'auth',
      protoPath: join(__dirname, '../src/api/v1/modules/auth/proto/auth.proto')
    }
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['kafka:29092']
      },
      consumer: {
        groupId: 'auth-consumer'
      }
    }
  });

  await app.startAllMicroservices();
  // const app = await NestFactory.createMicroservice(AppModule, {
  //   transport: Transport.GRPC,
  //   options: {
  //     url: '0.0.0.0:50051',
  //     package: 'app',
  //     protoPath: join(__dirname, '../src/tester/app.proto')
  //   }
  // });

  app.useLogger(app.get(Logger));

  app.get(ConfigService);

  app.enableShutdownHooks();

  return app;
}
