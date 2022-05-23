import { Test } from '@nestjs/testing';
import { DirectoriesService } from './directories.service';

describe('DirectoriesService', () => {
  let service;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [DirectoriesService],
    }).compile();

    service = module.get(DirectoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
