import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_API_CLIENT_ID,
  process.env.GOOGLE_API_CLIENT_SECRET,
  process.env.GOOGLE_API_REDIRECT_URL,
);

console.log('process.env.GOOGLE_API_CLIENT_ID:', process.env.GOOGLE_API_CLIENT_ID);
console.log('process.env.GOOGLE_API_CLIENT_SECRET:', process.env.GOOGLE_API_CLIENT_SECRET);
console.log('process.env.GOOGLE_API_REDIRECT_URL:', process.env.GOOGLE_API_REDIRECT_URL);

@Injectable()
export class UsersService {

  getGoogleLoginUrl(): string {
    return oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/youtube.readonly',
      ],
    });
  }

  getHello(): string {
    return 'Welcome to Alfan Assignment';
  }
}
