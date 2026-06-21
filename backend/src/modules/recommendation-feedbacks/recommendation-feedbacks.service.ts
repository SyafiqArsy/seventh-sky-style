import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Injectable()
export class RecommendationFeedbacksService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    userId: string,
    dto: CreateFeedbackDto,
  ) {
    const recommendationItem =
      await this.prisma.recommendationItem.findUnique({
        where: {
          id: dto.recommendationItemId,
        },
      });

    if (!recommendationItem) {
      throw new BadRequestException(
        'Recommendation item not found',
      );
    }

    const existingFeedback =
      await this.prisma.recommendationFeedback.findUnique({
        where: {
          userId_recommendationItemId: {
            userId,
            recommendationItemId:
              dto.recommendationItemId,
          },
        },
      });

    if (existingFeedback) {
      return this.prisma.recommendationFeedback.update({
        where: {
          id: existingFeedback.id,
        },
        data: {
          feedback: dto.feedback,
        },
      });
    }

    return this.prisma.recommendationFeedback.create({
      data: {
        userId,
        recommendationItemId:
          dto.recommendationItemId,
        feedback: dto.feedback,
      },
    });
  }

  async findMyFeedbacks(
    userId: string,
  ) {
    return this.prisma.recommendationFeedback.findMany({
      where: {
        userId,
      },

      include: {
        recommendationItem: {
          include: {
            outfit: true,
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}