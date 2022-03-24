import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TerminusModule } from '@nestjs/terminus';
import { LoggerModule } from 'nestjs-pino';
// import { MongoosedbModule } from './db/mongoose/mongoosedb.module';
import { ResponseService } from './services/response/response.service';

import { HealthcheckController } from './healthcheck/healthcheck.controller';
import { VersionHealthIndicator } from './healthcheck/services/version-health-check.service';
import { ShutdownService } from './services/shutdown/shutdown.service';
import * as path from 'path';
import { readFileSync } from 'fs-extra';
import { GrpcModule } from './grpc/grpc.module';
import { KafkaModule } from './kafka/kafka.module';
import pretty from 'pino-pretty';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => {
        return {
          pinoHttp: pretty({
            colorize: true
          })
        };
      }
    }),
    JwtModule.register({
      publicKey: readFileSync(
        `${path.join(__dirname, '..', 'KEYS')}/oauth-public.key`,
        'utf8'
      )
    }),
    TerminusModule,
    GrpcModule.forRoot(),
    KafkaModule
    // MongoosedbModule
  ],
  controllers: [HealthcheckController],
  providers: [ShutdownService, ResponseService, VersionHealthIndicator],
  exports: [JwtModule, LoggerModule, ResponseService, GrpcModule]
})
export class CoreModule {}
