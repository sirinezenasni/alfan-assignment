import { Controller, Get, Req, UseGuards, Header } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProviderUserData } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Get('google')
  @Header('Access-Control-Allow-Origin', '*')
  @UseGuards(AuthGuard('google'))
  async getUserFromGoogleLogin(@Req() req): Promise<any> {
    const providerUserData = <ProviderUserData>req.user;
    
    const jwt = await this.authService.getJWTFromProviderUserData(providerUserData);

    console.log('jwt:', jwt);
    return {
      jwt,
    };
  }
}
