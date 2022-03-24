import { Routes } from 'nest-router';
import { DemoModule } from './modules/demo/demo.module';

export const v1Routes: Routes = [
  {
    path: '/v1',
    children: [
      // {
      //   path: '/plaid/documents',
      //   module: PlaidModule
      // },
      // {
      //   path: '/documents',
      //   module: FacadeModule
      // },
      {
        path: '/demo',
        module: DemoModule
      }
      // {
      //   path: '/security',
      //   module: SecurityModule
      // }
    ]
  }
];
