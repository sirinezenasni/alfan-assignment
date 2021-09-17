import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetGoogleLoginUrlResponseDTO } from './dto/getGoogleLoginUrlResponseDTO';
import { GoogleLoginRequestDTO } from './dto/googleLoginRequestDTO';
import { GoogleLoginResponseDTO } from './dto/googleLoginResponseDTO';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('google/login')
  getGoogleLoginUrl(): GetGoogleLoginUrlResponseDTO {
    let response = new GetGoogleLoginUrlResponseDTO();
    response.redirectUrl = this.usersService.getGoogleLoginUrl();
    return response;
  }

  @Post('google/login')
  async googleLogin(@Body() googleLoginRequestDTO: GoogleLoginRequestDTO): Promise<GoogleLoginResponseDTO> {
    const tokens = await this.usersService.getTokensFromCode(googleLoginRequestDTO.code);
    console.log('tokens in controller:', tokens);

    let response = new GoogleLoginResponseDTO();
    response.jwt = '';
    return response;
  }
}
