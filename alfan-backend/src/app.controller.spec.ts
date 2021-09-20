import { Test, TestingModule } from '@nestjs/testing';

describe('AppController', () => {
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [],
    }).compile();
  });

  describe('google auth', () => {
    it('should return jwt', () => {
      // TODO
    });
  });
});
