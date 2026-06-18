import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateProfileDto } from './dto/create-profile.dto';

import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    userId: string,
    dto: CreateProfileDto,
  ) {
    const existingProfile =
      await this.prisma.userProfile.findUnique({
        where: {
          userId,
        },
      });

    if (existingProfile) {
      throw new BadRequestException(
        'Profile already exists',
      );
    }

    return this.prisma.userProfile.create({
      data: {
        userId,

        gender: dto.gender,
        age: dto.age,

        height: dto.height,
        weight: dto.weight,

        skinTone: dto.skinTone,

        favoriteColorId:
          dto.favoriteColorId,

        preferredStyleId:
          dto.preferredStyleId,

        budgetRange:
          dto.budgetRange,
      },
    });
  }

    async findMyProfile(userId: string) {
    return this.prisma.userProfile.findUnique({
        where: {
        userId,
        },

        include: {
        favoriteColor: true,
        preferredStyle: true,
        },
    });
    }

    async update(
    userId: string,
    dto: UpdateProfileDto,
    ) {
    const profile =
        await this.prisma.userProfile.findUnique({
        where: {
            userId,
        },
        });

    if (!profile) {
        throw new BadRequestException(
        'Profile not found',
        );
    }

    return this.prisma.userProfile.update({
        where: {
        userId,
        },
        data: dto,
        include: {
        favoriteColor: true,
        preferredStyle: true,
        },
    });
    }
}