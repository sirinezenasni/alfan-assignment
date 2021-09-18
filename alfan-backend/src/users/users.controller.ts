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
  async googleLogin(@Body() googleLoginRequestDTO: GoogleLoginRequestDTO): Promise<any> {
    const oauth2ClientAndToken = await this.usersService.getOAuth2ClientFromCode(googleLoginRequestDTO.code);
    const userData = await this.usersService.getUserData(oauth2ClientAndToken);

    const user = await this.usersService.getOrCreateUser(userData);
    console.log('final user:', user);
    //const youtubeChannels = await this.usersService.getYoutubeChannels(oauth2Client);
    //console.log('youtubeChannels in controller:', youtubeChannels);

    let response = new GoogleLoginResponseDTO();
    response.jwt = '';
    return response;
  }
}
