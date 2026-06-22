import {
  Controller,
  Post,
  Req,
  UseGuards,
  Get,
  Body,
  Param,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { RecommendationsService } from './recommendations.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { GenerateRecommendationDto } from './dto/generate-recommendation.dto';

@ApiTags('Recommendations')
@Controller('recommendations')
export class RecommendationsController {
  constructor(
    private readonly recommendationsService: RecommendationsService,
  ) {}

  @Post('generate')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Generate outfit recommendations',
  })
  async generate(
    @Req() req: any,
    @Body() dto: GenerateRecommendationDto,
  ) {
    return this.recommendationsService.generate(
      req.user.sub,
      dto,
    );
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get my recommendation history',
  })
  async findMyRecommendations(
    @Req() req: any,
  ) {
    return this.recommendationsService.findMyRecommendations(
      req.user.sub,
    );
  }

  @Get('me/latest')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get latest recommendation',
  })
  findLatest(
    @Req() req: any,
  ) {
    return this.recommendationsService.findLatest(
      req.user.sub,
    );
  }

  @Get('me/history')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get recommendation history',
  })
  findHistory(
    @Req() req: any,
  ) {
    return this.recommendationsService.findHistory(
      req.user.sub,
    );
  }

    @Get(':id')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({
      summary: 'Get single recommendation details',
    })
    findOne(
      @Param('id') id: string,
      @Req() req: any,
    ) {
      return this.recommendationsService.findOne(
        id,
        req.user.sub,
      );
    }
}