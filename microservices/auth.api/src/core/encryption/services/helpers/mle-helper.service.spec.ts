import { Test, TestingModule } from '@nestjs/testing';
import { MleHelperService } from './mle-helper.service';

describe('MleHelperService', () => {
  let service: MleHelperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MleHelperService]
    }).compile();

    service = module.get<MleHelperService>(MleHelperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
