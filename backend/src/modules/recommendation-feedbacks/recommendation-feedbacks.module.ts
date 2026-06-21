import { Module } from '@nestjs/common';

import { RecommendationFeedbacksController } from './recommendation-feedbacks.controller';
import { RecommendationFeedbacksService } from './recommendation-feedbacks.service';

@Module({
  controllers: [
    RecommendationFeedbacksController,
  ],

  providers: [
    RecommendationFeedbacksService,
  ],
})
export class RecommendationFeedbacksModule {}