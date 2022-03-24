import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { BillingService } from './billing.service';
import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';

@Controller()
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @MessagePattern('createBilling')
  create(createBillingDto: CreateBillingDto) {
    console.log(createBillingDto, 'BILLING');
    return this.billingService.create(createBillingDto);
  }

  @MessagePattern('findAllBilling')
  findAll() {
    return this.billingService.findAll();
  }

  @MessagePattern('findOneBilling')
  findOne(@Payload() id: number) {
    return this.billingService.findOne(id);
  }

  @MessagePattern('updateBilling')
  update(@Payload() updateBillingDto: UpdateBillingDto) {
    return this.billingService.update(updateBillingDto.id, updateBillingDto);
  }

  @MessagePattern('removeBilling')
  remove(@Payload() id: number) {
    return this.billingService.remove(id);
  }
}
