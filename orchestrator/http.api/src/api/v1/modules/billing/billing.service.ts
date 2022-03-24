import { Injectable, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';

@Injectable()
export class BillingService {
  constructor(
    @Inject('BILLING_SERVICE') private readonly billingClient: ClientKafka
  ) {}

  create(createBillingDto: CreateBillingDto) {
    return this.billingClient.send(
      'createBilling',
      JSON.stringify(createBillingDto)
    );
  }

  findAll() {
    return 'This action returns all billing';
  }

  findOne(id: number) {
    return `This action returns a #${id} billing`;
  }

  update(id: number, updateBillingDto: UpdateBillingDto) {
    return `This action updates a #${id} billing`;
  }

  remove(id: number) {
    return `This action removes a #${id} billing`;
  }
}
