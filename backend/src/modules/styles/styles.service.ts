import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class StylesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.style.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }
}