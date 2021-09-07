import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IndexResponseDTO } from './index/IndexResponseDTO';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): IndexResponseDTO {
    let response = new IndexResponseDTO();
    response.title = this.appService.getHello();
    return response;
  }
}
