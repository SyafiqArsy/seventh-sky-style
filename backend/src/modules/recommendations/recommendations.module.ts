import { Module } from '@nestjs/common';

import { RecommendationsController } from './recommendations.controller';
import { RecommendationsService } from './recommendations.service';

import { ProfilesModule } from '../profiles/profiles.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ProfilesModule,
    AuthModule,
  ],

  controllers: [
    RecommendationsController,
  ],

  providers: [
    RecommendationsService,
  ],
})
export class RecommendationsModule {}