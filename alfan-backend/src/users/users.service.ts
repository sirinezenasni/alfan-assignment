import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { google, youtube_v3, Auth } from 'googleapis';
import { User } from './models/user.entity';
import { UserCredentials } from './models/user.credentials.entity';

export class ProviderUserData {
  providerType: string;
  providerId: string;
  firstName: string;
  lastName: string;
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserCredentials)
    private userCredentialsRepository: Repository<UserCredentials>,
  ) {}

  async getUserCredentials(
    userId: string,
    providerType: string,
  ): Promise<UserCredentials> {
    return this.userCredentialsRepository.findOne(<FindOneOptions>{
      where: <FindConditions<UserCredentials>>{
        type: providerType,
        user: userId,
      },
    });
  }

  async getYoutubeChannels(accessToken: string): Promise<any> {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_API_CLIENT_ID,
      process.env.GOOGLE_API_CLIENT_SECRET,
      process.env.GOOGLE_API_REDIRECT_URL,
    );
    oauth2Client.setCredentials(<Auth.Credentials>{
      access_token: accessToken,
    });

    const youtube = google.youtube(<youtube_v3.Options>{
      version: 'v3',
      auth: oauth2Client,
    });

    const channels = await youtube.channels.list({
      part: ['snippet', 'contentDetails', 'statistics'],
      mine: true,
    });

    return channels.data;
  }

  async getOrCreateUser(userData: ProviderUserData): Promise<User> {
    const userCredentials = await this.userCredentialsRepository.findOne(<
      FindOneOptions
    >{
      where: <FindConditions<UserCredentials>>{
        type: userData.providerType,
        providerId: userData.providerId,
      },
      relations: ['user'],
    });

    if (userCredentials) {
      userCredentials.accessToken = userData.accessToken;
      userCredentials.refreshToken = userData.refreshToken;
      await this.userCredentialsRepository.save(userCredentials);
      return userCredentials.user;
    }

    const user = this.usersRepository.create({
      firstName: userData.firstName,
      lastName: userData.lastName,
    });
    await this.usersRepository.save(user);

    const newUserCredentials = this.userCredentialsRepository.create({
      accessToken: userData.accessToken,
      refreshToken: userData.refreshToken,
      type: userData.providerType,
      providerId: userData.providerId,
      user: user,
    });
    await this.userCredentialsRepository.save(newUserCredentials);

    return user;
  }
}
