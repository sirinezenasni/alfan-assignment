import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './google.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: 1000,
          },
        };
      },
    }),
  ],
  providers: [
    AuthService,
    GoogleStrategy,
  ],
  controllers: [
    AuthController,
  ],
})

export class AuthModule { }
