import { Injectable } from '@nestjs/common';
import { ProviderUserData, UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async getJWTFromProviderUserData(
    providerUserData: ProviderUserData,
  ): Promise<string> {
    const user = await this.usersService.getOrCreateUser(providerUserData);

    const jwt = this.jwtService.sign(<JwtPayload>{
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    });

    return jwt;
  }
}
