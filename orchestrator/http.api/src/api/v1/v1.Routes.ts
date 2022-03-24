import { Routes } from 'nest-router';
import { DemoModule } from './modules/demo/demo.module';
import { AuthModule } from './modules/auth/auth.module';
import { BillingModule } from './modules/billing/billing.module';

export const v1Routes: Routes = [
  {
    path: '/v1',
    children: [
      {
        path: '/demo',
        module: DemoModule
      },
      {
        path: '/auth',
        module: AuthModule
      },
      {
        path: '/billing',
        module: BillingModule
      }
    ]
  }
];
