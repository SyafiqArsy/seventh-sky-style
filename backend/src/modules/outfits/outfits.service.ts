import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import slugify from 'slugify';

import { CreateOutfitDto } from './dto/create-outfit.dto';

import { UpdateOutfitDto } from './dto/update-outfit.dto';
import { OutfitQueryDto } from './dto/outfit-query.dto';
import { AddOutfitItemDto } from './dto/add-outfit-item.dto';

@Injectable()
export class OutfitsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async validateRelations(
    styleId: string,
    occasionId: string,
    bodyTypeId: string,
  ) {
    const style =
      await this.prisma.style.findUnique({
        where: {
          id: styleId,
        },
      });

    if (!style) {
      throw new BadRequestException(
        'Style not found',
      );
    }

    const occasion =
      await this.prisma.occasion.findUnique({
        where: {
          id: occasionId,
        },
      });

    if (!occasion) {
      throw new BadRequestException(
        'Occasion not found',
      );
    }

    const bodyType =
      await this.prisma.bodyType.findUnique({
        where: {
          id: bodyTypeId,
        },
      });

    if (!bodyType) {
      throw new BadRequestException(
        'Body type not found',
      );
    }
  }

  async create(
    createOutfitDto: CreateOutfitDto,
  ) {
    await this.validateRelations(
      createOutfitDto.styleId,
      createOutfitDto.occasionId,
      createOutfitDto.bodyTypeId,
    );

    const slug = slugify(
      createOutfitDto.name,
      {
        lower: true,
        strict: true,
        trim: true,
      },
    );

    const existingOutfit =
      await this.prisma.outfit.findUnique({
        where: {
          slug,
        },
      });

    if (existingOutfit) {
      throw new BadRequestException(
        'Outfit with this name already exists',
      );
    }

    return this.prisma.outfit.create({
      data: {
        ...createOutfitDto,
        slug,
      },

      include: {
        style: true,
        occasion: true,
        bodyType: true,
      },
    });
  }

  async findOne(id: string) {
    const outfit =
      await this.prisma.outfit.findUnique({
        where: {
          id,
        },

        include: {
          style: true,
          occasion: true,
          bodyType: true,

          outfitItems: {
            include: {
              fashionItem: {
                include: {
                  category: true,
                  color: true,
                  style: true,
                },
              },
            },
          },
        },
      });

    if (!outfit) {
      throw new NotFoundException(
        'Outfit not found',
      );
    }

    return outfit;
  }

    async findAll(
    query: OutfitQueryDto,
    ) {
    const page =
        Number(query.page) > 0
        ? Number(query.page)
        : 1;

    const limit =
        Number(query.limit) > 0
        ? Number(query.limit)
        : 10;

    const skip =
        (page - 1) * limit;

    const where: any = {};

    if (query.search) {
        where.name = {
        contains: query.search,
        mode: 'insensitive',
        };
    }

    if (query.styleId) {
        where.styleId =
        query.styleId;
    }

    if (query.occasionId) {
        where.occasionId =
        query.occasionId;
    }

    if (query.bodyTypeId) {
        where.bodyTypeId =
        query.bodyTypeId;
    }

    if (query.gender) {
        where.gender =
        query.gender;
    }

    if (
        query.isActive !== undefined
    ) {
        where.isActive =
        query.isActive === 'true';
    }

    const [outfits, total] =
        await Promise.all([
        this.prisma.outfit.findMany({
            where,

            include: {
            style: true,
            occasion: true,
            bodyType: true,
            _count: {
                select: {
                outfitItems: true,
                },
            },
            },

            skip,
            take: limit,

            orderBy: {
            createdAt: 'desc',
            },
        }),

        this.prisma.outfit.count({
            where,
        }),
        ]);

    return {
        data: outfits,

        meta: {
        page,
        limit,
        total,

        totalPages:
            Math.ceil(total / limit),
        },
    };
    }

    async update(
    id: string,
    updateOutfitDto: UpdateOutfitDto,
    ) {
    await this.findOne(id);

    if (
        updateOutfitDto.styleId &&
        updateOutfitDto.occasionId &&
        updateOutfitDto.bodyTypeId
    ) {
        await this.validateRelations(
        updateOutfitDto.styleId,
        updateOutfitDto.occasionId,
        updateOutfitDto.bodyTypeId,
        );
    }

    const data: any = {
        ...updateOutfitDto,
    };

    if (updateOutfitDto.name) {
        data.slug = slugify(
        updateOutfitDto.name,
        {
            lower: true,
            strict: true,
            trim: true,
        },
        );
    }

    return this.prisma.outfit.update({
        where: {
        id,
        },

        data,

        include: {
        style: true,
        occasion: true,
        bodyType: true,
        },
    });
    }

    async remove(id: string) {
    await this.findOne(id);

    return this.prisma.outfit.delete({
        where: {
        id,
        },
    });
    }

    async addItem(
    outfitId: string,
    dto: AddOutfitItemDto,
    ) {
    await this.findOne(outfitId);

    const fashionItem =
        await this.prisma.fashionItem.findUnique({
        where: {
            id: dto.fashionItemId,
        },
        });

    if (!fashionItem) {
        throw new BadRequestException(
        'Fashion item not found',
        );
    }

    const existingRole =
        await this.prisma.outfitItem.findFirst({
        where: {
            outfitId,
            role: dto.role,
        },
        });

    if (existingRole) {
        throw new BadRequestException(
        `Role ${dto.role} already exists in this outfit`,
        );
    }

    await this.prisma.outfitItem.create({
        data: {
        outfitId,
        role: dto.role,
        fashionItemId:
            dto.fashionItemId,
        },
    });

    return this.findOne(outfitId);
    }

    async removeItem(
    outfitId: string,
    itemId: string,
    ) {
    await this.findOne(outfitId);

    const item =
        await this.prisma.outfitItem.findFirst({
        where: {
            id: itemId,
            outfitId,
        },
        });

    if (!item) {
        throw new NotFoundException(
        'Outfit item not found',
        );
    }

    await this.prisma.outfitItem.delete({
        where: {
        id: itemId,
        },
    });

    return {
        message:
        'Outfit item removed successfully',
    };
    }
}