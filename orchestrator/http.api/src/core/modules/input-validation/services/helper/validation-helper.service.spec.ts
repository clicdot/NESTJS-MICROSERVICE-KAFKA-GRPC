import { Test, TestingModule } from '@nestjs/testing';
import { ValidationHelperService } from './validation-helper.service';

describe('ValidationHelperService', () => {
  let service: ValidationHelperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidationHelperService]
    }).compile();

    service = module.get<ValidationHelperService>(ValidationHelperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
