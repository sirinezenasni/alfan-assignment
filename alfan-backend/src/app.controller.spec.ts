import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IndexResponseDTO } from './index/IndexResponseDTO';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return IndexResponseDTO', () => {
      let response = new IndexResponseDTO();
      response.title = 'Welcome to Alfan Assignment';
      expect(appController.getHello()).toStrictEqual(response);
    });
  });
});
