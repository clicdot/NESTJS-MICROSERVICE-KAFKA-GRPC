import { Module } from '@nestjs/common';
import { MleService } from './services/mle.service';
import { MleHelperService } from './services/helpers/mle-helper.service';

@Module({
  providers: [MleService, MleHelperService],
  exports: [MleService, MleHelperService]
})
export class MleModule {}
