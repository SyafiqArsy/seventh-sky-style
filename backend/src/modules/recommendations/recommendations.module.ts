import { Module } from '@nestjs/common';

import { RecommendationsController } from './recommendations.controller';
import { RecommendationsService } from './recommendations.service';

import { ProfilesModule } from '../profiles/profiles.module';
import { AuthModule } from '../auth/auth.module';

import { AiModule } from '../ai/ai.module';

@Module({
  imports: [
    ProfilesModule,
    AuthModule,
    AiModule,
  ],

  controllers: [
    RecommendationsController,
  ],

  providers: [
    RecommendationsService,
  ],
})
export class RecommendationsModule {}