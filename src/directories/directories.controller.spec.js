import { Test } from '@nestjs/testing';
import { DirectoriesController } from './directories.controller';

describe('Directories Controller', () => {
  let controller;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [DirectoriesController],
    }).compile();

    controller = module.get(DirectoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
