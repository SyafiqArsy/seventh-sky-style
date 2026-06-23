import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getStats() {
    const [
      users,
      profiles,
      outfits,
      recommendations,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.userProfile.count(),
      this.prisma.outfit.count(),
      this.prisma.recommendation.count(),
    ]);

    return {
      users,
      profiles,
      outfits,
      recommendations,
    };
  }
}