import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';

import { v1Routes } from './v1.Routes';
import { DemoModule } from './modules/demo/demo.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [RouterModule.forRoutes(v1Routes), DemoModule, AuthModule],
  controllers: [],
  providers: []
})
export class V1Module {}
