import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka, ClientGrpc } from '@nestjs/microservices';

import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGrpcService } from './interfaces/auth.grpc.interface';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  private authGrpcService: AuthGrpcService;
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientGrpc
  ) {}

  onModuleInit() {
    this.authGrpcService =
      this.authClient.getService<AuthGrpcService>('AuthController');
  }

  create(createAuthDto: CreateAuthDto) {
    return this.authGrpcService.create(createAuthDto);
  }

  login(loginAuthDto: LoginAuthDto) {
    return this.authGrpcService.login(loginAuthDto);
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
