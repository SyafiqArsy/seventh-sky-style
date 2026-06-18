import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ColorsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAll() {
    return this.prisma.color.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }
}