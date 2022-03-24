import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGrpcService } from './interfaces/auth.grpc.interface';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('create')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  // @MessagePattern('findAllAuth')
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @MessagePattern('findOneAuth')
  // findOne(@Payload() id: number) {
  //   return this.authService.findOne(id);
  // }

  // @MessagePattern('updateAuth')
  // update(@Payload() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(updateAuthDto.id, updateAuthDto);
  // }

  // @MessagePattern('removeAuth')
  // remove(@Payload() id: number) {
  //   return this.authService.remove(id);
  // }
}
