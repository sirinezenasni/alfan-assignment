import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetYoutubeDataResponseDTO } from './dto/GetYoutubeDataResponseDTO';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Get('youtube')
  @UseGuards(AuthGuard('jwt'))
  async getUserYoutubeData(@Req() req): Promise<GetYoutubeDataResponseDTO> {
    const userCredentials = await this.usersService.getUserCredentials(req.user.userId, 'google');
    const youtubeChannels = await this.usersService.getYoutubeChannels(userCredentials.accessToken);
    const youtubeData = youtubeChannels.items[0];

    return <GetYoutubeDataResponseDTO>{
      imageUrl: youtubeData.snippet.thumbnails.medium.url,
      title: youtubeData.snippet.title,
      subscriberCount: youtubeData.statistics.subscriberCount,
      videoCount: youtubeData.statistics.videoCount,
      viewCount: youtubeData.statistics.viewCount,
      youtubeUrl: `https://www.youtube.com/channel/${youtubeData.id}`,
    };
  }
}
