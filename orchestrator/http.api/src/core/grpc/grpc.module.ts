import { DynamicModule, Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

interface Options {
  url: string;
  package: string;
  protoPath: string;
}

@Global()
@Module({})
export class GrpcModule {
  static async forRoot(options?: Options): Promise<DynamicModule> {
    return {
      module: GrpcModule,
      global: true,
      imports: [...(await GrpcModule.commonImports(options))],
      controllers: GrpcModule.commonControllers(),
      providers: GrpcModule.commonProviders(),
      exports: GrpcModule.commonExports()
    };
  }

  private static async commonImports(options?: Options): Promise<any[]> {
    console.log(join(__dirname, '../../api/v1/modules/auth/proto/auth.proto'));
    return [
      ClientsModule.registerAsync([
        {
          name: 'AUTH_SERVICE',
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            transport: Transport.GRPC,
            options: {
              url:
                configService.get<string>('GRPC_URL') ||
                options?.url ||
                'auth:8877',
              package:
                configService.get<string>('GRPC_PACKAGE') ||
                options?.package ||
                'auth',
              protoPath:
                configService.get<string>('GRPC_PROTOPATH') ||
                options?.protoPath ||
                join(__dirname, '../../api/v1/modules/auth/proto/auth.proto')
            }
          }),
          inject: [ConfigService]
        }
      ])
    ];
  }

  // Helper import for common controllers
  private static commonControllers(): any[] {
    return [];
  }

  // Helper import for common providers
  private static commonProviders(): any[] {
    return [];
  }

  // Helper import for common exports
  private static commonExports(): any[] {
    return [];
  }
}
