import { Test, TestingModule } from '@nestjs/testing';
import { MleService } from './mle.service';

describe('MleService', () => {
  let service: MleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MleService]
    }).compile();

    service = module.get<MleService>(MleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
