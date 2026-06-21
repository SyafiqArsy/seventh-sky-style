import { Module } from '@nestjs/common';

import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';

import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
  ],

  controllers: [
    ProfilesController,
  ],

  providers: [
    ProfilesService,
  ],

  exports: [
    ProfilesService,
  ],
})
export class ProfilesModule {}