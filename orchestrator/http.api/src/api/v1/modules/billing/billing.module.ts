import { Module } from '@nestjs/common';
import { BillingService } from './billing.service';
import { BillingController } from './billing.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'BILLING_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'billing',
            brokers: ['kafka:29092']
          },
          consumer: {
            groupId: 'billing-consumer'
          }
        }
      }
    ])
  ],
  controllers: [BillingController],
  providers: [BillingService]
})
export class BillingModule {}
