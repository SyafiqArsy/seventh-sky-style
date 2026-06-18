import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOccasionDto } from './dto/create-occasion.dto';
import { UpdateOccasionDto } from './dto/update-occasion.dto';

@Injectable()
export class OccasionsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.occasion.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const occasion = await this.prisma.occasion.findUnique({
      where: { id },
    });

    if (!occasion) {
      throw new NotFoundException(`Occasion with ID ${id} not found`);
    }

    return occasion;
  }

  async create(createOccasionDto: CreateOccasionDto) {
    return this.prisma.occasion.create({
      data: createOccasionDto,
    });
  }

  async update(id: string, updateOccasionDto: UpdateOccasionDto) {
    await this.findOne(id);

    return this.prisma.occasion.update({
      where: { id },
      data: updateOccasionDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.occasion.delete({
      where: { id },
    });
  }
}
