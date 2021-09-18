import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { google, youtube_v3, oauth2_v2, Auth } from 'googleapis';
import { User } from './models/user.entity';
import { UserCredentials } from './models/user.credentials.entity';

const _oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_API_CLIENT_ID,
  process.env.GOOGLE_API_CLIENT_SECRET,
  process.env.GOOGLE_API_REDIRECT_URL,
);

class ProviderUserData {
  providerType: string;
  providerId: string;
  firstName: string;
  lastName: string;
  accessToken: string;
  refreshToken: string;
}

class OAuthClientAndTokens {
  client: Auth.OAuth2Client;
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

  getGoogleLoginUrl(): string {
    return _oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/youtube.readonly',
        'https://www.googleapis.com/auth/userinfo.profile',
      ],
    });
  }

  async getOAuth2ClientFromCode(code: string): Promise<OAuthClientAndTokens> {
    const { tokens } = await _oauth2Client.getToken(code);
    _oauth2Client.setCredentials(tokens);
    return <OAuthClientAndTokens>{
      client: _oauth2Client,
      refreshToken: tokens.refresh_token,
      accessToken: tokens.access_token,
    };
  }

  async getUserData(oauth2ClientAndTokens: OAuthClientAndTokens): Promise<ProviderUserData> {
    const oauth2Service = google.oauth2(<oauth2_v2.Options>{
      version: 'v2',
      auth: oauth2ClientAndTokens.client,
    });

    const userInfoResponse = await oauth2Service.userinfo.get();
    return <ProviderUserData>{
      providerType: 'google',
      providerId: userInfoResponse.data.id,
      firstName: userInfoResponse.data.given_name,
      lastName: userInfoResponse.data.family_name,
      accessToken: oauth2ClientAndTokens.accessToken,
      refreshToken: oauth2ClientAndTokens.refreshToken,
    };
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
