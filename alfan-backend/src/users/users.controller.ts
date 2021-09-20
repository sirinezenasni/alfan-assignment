import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Get('youtube')
  @UseGuards(AuthGuard('jwt'))
  async getUserYoutubeData(@Req() req): Promise<any> {
    const userCredentials = await this.usersService.getUserCredentials(req.user.userId, 'google');
    const youtubeData = await this.usersService.getYoutubeChannels(userCredentials.accessToken);
    console.log('youtubeData:', youtubeData);
    return youtubeData;
  }
}
