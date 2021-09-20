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

  async findOne(providerType: string, providerId: string): Promise<User | null> {
    const userCredentials = await this.userCredentialsRepository.findOne(<FindOneOptions>{
      where: <FindConditions<UserCredentials>>{
        type: providerType,
        providerId: providerId,
      },
      relations: ['user'],
    });

    if (userCredentials) {
      return userCredentials.user;
    }
    return null;
	}

  async getYoutubeChannels(oauth2Client: Auth.OAuth2Client): Promise<any> {
    const youtube = google.youtube(<youtube_v3.Options>{
      version: 'v3',
      auth: oauth2Client,
    });

    const channels = await youtube.channels.list({
      part: ['contentDetails'],
      mine: true,
    });

    console.log('channels:', channels.data.items);

    return channels.data;
  }

  async getOrCreateUser(userData: ProviderUserData): Promise<User> {
    const userCredentials = await this.userCredentialsRepository.findOne(<FindOneOptions>{
      where: <FindConditions<UserCredentials>>{
        type: userData.providerType,
        providerId: userData.providerId,
      },
      relations: ['user'],
    })

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
