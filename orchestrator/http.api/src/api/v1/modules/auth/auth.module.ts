import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { GrpcModule } from '../../../../core/grpc/grpc.module';
//'/app/src/api/v1/modules/v1/modules/auth/proto/auth.proto'
console.log(join(__dirname, '../auth/proto/app.proto'));
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.GRPC,
        options: {
          url: 'auth:8877',
          package: 'auth',
          protoPath: join(__dirname, '../auth/proto/auth.proto')
        }
      }
    ])
  ],
  controllers: [AuthController],
  providers: [
    AuthService
    // {
    //   provide: 'AUTH_SERVICE',
    //   useClass: GrpcModule
    // }
  ]
})
export class AuthModule {}
