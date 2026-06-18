import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBodyTypeDto } from './dto/create-body-type.dto';
import { UpdateBodyTypeDto } from './dto/update-body-type.dto';

@Injectable()
export class BodyTypesService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAll() {
    return this.prisma.bodyType.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const bodyType = await this.prisma.bodyType.findUnique({
      where: { id },
    });

    if (!bodyType) {
      throw new NotFoundException(`Body type with ID ${id} not found`);
    }

    return bodyType;
  }

  async create(createBodyTypeDto: CreateBodyTypeDto) {
    return this.prisma.bodyType.create({
      data: createBodyTypeDto,
    });
  }

  async update(id: string, updateBodyTypeDto: UpdateBodyTypeDto) {
    await this.findOne(id);

    return this.prisma.bodyType.update({
      where: { id },
      data: updateBodyTypeDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.bodyType.delete({
      where: { id },
    });
  }
}