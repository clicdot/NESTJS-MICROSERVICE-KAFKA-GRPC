import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtservice: JwtService) {}

  create(createAuthDto: CreateAuthDto) {
    console.log(createAuthDto);
    const claims = {
      company: 'getsquire',
      sessionId: uuidv4(),
      encryption: true,
      credential: 'client',
      key: 'QwPNBbotPcyhu8fcucb8PUGrXyZUPeNvUaqHBTXtWqet29tb6qzQyZUHeFCWxHWP',
      scope: []
    };
    const token = this.jwtservice.sign(claims);
    return {
      token
    };
  }

  login(loginAuthDto: LoginAuthDto) {
    console.log(loginAuthDto);
    const claims = {
      company: 'getsquire',
      sessionId: uuidv4(),
      encryption: true,
      credential: 'password',
      key: 'QwPNBbotPcyhu8fcucb8PUGrXyZUPeNvUaqHBTXtWqet29tb6qzQyZUHeFCWxHWP',
      scope: []
    };
    const token = this.jwtservice.sign(claims);
    return {
      token
    };
  }

  findAll() {
    return 'This action returns all auth';
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
