import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginResponseDTO } from './dto/loginResponseDTO';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('google/login')
  login(): LoginResponseDTO {
    let response = new LoginResponseDTO();
    response.redirectUrl = this.usersService.getGoogleLoginUrl();
    return response;
  }
}
