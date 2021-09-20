import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './google.strategy';
import { JwtAuthStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: 60 * 60 * 24,
          },
        };
      },
    }),
  ],
  providers: [
    AuthService,
    GoogleStrategy,
    JwtAuthStrategy,
  ],
  controllers: [
    AuthController,
  ],
})

export class AuthModule { }
