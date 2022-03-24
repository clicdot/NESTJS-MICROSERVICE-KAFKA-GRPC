import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as os from 'os';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
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
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
