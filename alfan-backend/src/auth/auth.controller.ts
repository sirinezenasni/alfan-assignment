import { Controller, Get, Req, UseGuards, Header } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProviderUserData } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginResponseDTO } from './dto/LoginResponseDTO';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Get('google')
  @Header('Access-Control-Allow-Origin', '*')
  @UseGuards(AuthGuard('google'))
  async getUserFromGoogleLogin(@Req() req): Promise<LoginResponseDTO> {
    const providerUserData = <ProviderUserData>req.user;
    const jwt = await this.authService.getJWTFromProviderUserData(providerUserData);

    return <LoginResponseDTO>{
      jwt,
    };
  }
}
