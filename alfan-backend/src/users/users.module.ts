import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './models/user.entity';
import { UserCredentials } from './models/user.credentials.entity';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserCredentials,
    ]),
  ],
  controllers: [],
  providers: [
    UsersService,
  ],
  exports: [
    UsersService,
    TypeOrmModule,
  ],
})
export class UsersModule {}
