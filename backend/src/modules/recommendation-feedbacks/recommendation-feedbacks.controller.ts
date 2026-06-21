import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

import { RecommendationFeedbacksService } from './recommendation-feedbacks.service';

import { CreateFeedbackDto } from './dto/create-feedback.dto';

@ApiTags('Recommendation Feedbacks')
@Controller('recommendation-feedbacks')
export class RecommendationFeedbacksController {
  constructor(
    private readonly feedbacksService: RecommendationFeedbacksService,
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary:
      'Create recommendation feedback',
  })
  create(
    @Req() req: any,
    @Body() dto: CreateFeedbackDto,
  ) {
    return this.feedbacksService.create(
      req.user.sub,
      dto,
    );
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary:
      'Get my feedback history',
  })
  findMyFeedbacks(
    @Req() req: any,
  ) {
    return this.feedbacksService.findMyFeedbacks(
      req.user.sub,
    );
  }
}