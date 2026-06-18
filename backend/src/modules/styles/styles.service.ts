import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateStyleDto } from './dto/create-style.dto';
import { UpdateStyleDto } from './dto/update-style.dto';

@Injectable()
export class StylesService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAll() {
    return this.prisma.style.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const style = await this.prisma.style.findUnique({
      where: { id },
    });

    if (!style) {
      throw new NotFoundException(`Style with ID ${id} not found`);
    }

    return style;
  }

  async create(createStyleDto: CreateStyleDto) {
    return this.prisma.style.create({
      data: createStyleDto,
    });
  }

  async update(id: string, updateStyleDto: UpdateStyleDto) {
    await this.findOne(id);

    return this.prisma.style.update({
      where: { id },
      data: updateStyleDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.style.delete({
      where: { id },
    });
  }
}