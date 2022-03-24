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
import pretty from 'pino-pretty';
import * as os from 'os';

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
      privateKey: process.env.PRIVATE_KEY,
      publicKey: process.env.PUBLIC_KEY,
      signOptions: {
        algorithm: 'RS256',
        audience: 'https://api.getsquire.com',
        issuer: `${os.hostname()}.api.getsquire.com`,
        expiresIn: '365d'
      },
      verifyOptions: {
        audience: 'https://api.getsquire.com',
        issuer: `${os.hostname()}.api.getsquire.com`
      }
    }),
    TerminusModule
    // MongoosedbModule
  ],
  controllers: [HealthcheckController],
  providers: [ShutdownService, ResponseService, VersionHealthIndicator],
  exports: [JwtModule, LoggerModule, ResponseService]
})
export class CoreModule {}
