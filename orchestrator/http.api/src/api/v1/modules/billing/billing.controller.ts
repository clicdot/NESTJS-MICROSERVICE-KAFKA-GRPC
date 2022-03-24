import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  OnModuleInit
} from '@nestjs/common';
import { MessagePattern, Payload, ClientKafka } from '@nestjs/microservices';
import { BillingService } from './billing.service';
import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';
import { Inject } from '@nestjs/common';

@Controller()
export class BillingController implements OnModuleInit {
  onModuleInit() {
    const requestPatterns = ['createBilling', 'findAllBilling'];

    requestPatterns.forEach((pattern) => {
      this.billingClient.subscribeToResponseOf(pattern);
    });
  }

  constructor(
    private readonly billingService: BillingService,
    @Inject('BILLING_SERVICE') private readonly billingClient: ClientKafka
  ) {}

  @Post('create')
  create(@Payload() createBillingDto: CreateBillingDto) {
    return this.billingService.create(createBillingDto);
  }

  @Post('findAll')
  findAll() {
    return this.billingService.findAll();
  }

  @Get('find')
  findOne(@Payload() id: number) {
    return this.billingService.findOne(id);
  }

  @Put('update')
  update(@Payload() updateBillingDto: UpdateBillingDto) {
    return this.billingService.update(updateBillingDto.id, updateBillingDto);
  }

  @Delete('remove')
  remove(@Payload() id: number) {
    return this.billingService.remove(id);
  }
}
