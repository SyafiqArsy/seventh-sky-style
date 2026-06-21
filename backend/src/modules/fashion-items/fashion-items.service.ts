import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import slugify from 'slugify';

import { CreateFashionItemDto } from './dto/create-fashion-item.dto';
import { UpdateFashionItemDto } from './dto/update-fashion-item.dto';
import { FashionItemQueryDto } from './dto/fashion-item-query.dto';

@Injectable()
export class FashionItemsService {
    constructor(
        private readonly prisma: PrismaService,
    ) {}

    async validateRelations(
    categoryId: string,
    styleId: string,
    colorId: string,
    ) {
    const category =
        await this.prisma.category.findUnique({
        where: {
            id: categoryId,
        },
        });

    if (!category) {
        throw new BadRequestException(
        'Category not found',
        );
    }

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

    const color =
        await this.prisma.color.findUnique({
        where: {
            id: colorId,
        },
        });

    if (!color) {
        throw new BadRequestException(
        'Color not found',
        );
    }
    }

    async findOne(id: string) {
    const item =
        await this.prisma.fashionItem.findUnique({
        where: {
            id,
        },

        include: {
            category: true,
            style: true,
            color: true,
        },
        });

    if (!item) {
        throw new NotFoundException(
        'Fashion item not found',
        );
    }

    return item;
    }

    async create(
    createFashionItemDto: CreateFashionItemDto,
    ) {
    await this.validateRelations(
        createFashionItemDto.categoryId,
        createFashionItemDto.styleId,
        createFashionItemDto.colorId,
    );

    const slug = slugify(
        createFashionItemDto.name,
        {
        lower: true,
        strict: true,
        trim: true,
        },
    );

    const existingItem =
        await this.prisma.fashionItem.findUnique({
        where: {
            slug,
        },
        });

    if (existingItem) {
        throw new BadRequestException(
        'Fashion item with this name already exists',
        );
    }

    return this.prisma.fashionItem.create({
        data: {
        ...createFashionItemDto,
        slug,
        },

        include: {
        category: true,
        style: true,
        color: true,
        },
    });
    }

    async findAll(
    query: FashionItemQueryDto,
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

    if (query.categoryId) {
        where.categoryId =
        query.categoryId;
    }

    if (query.styleId) {
        where.styleId =
        query.styleId;
    }

    if (query.gender) {
        where.gender =
        query.gender;
    }

    if (
    query.isActive !== undefined
    ) {
    where.isActive =
        query.isActive;
    }

    const [items, total] =
        await Promise.all([
        this.prisma.fashionItem.findMany({
            where,

            include: {
            category: true,
            style: true,
            color: true,
            },

            skip,
            take: limit,

            orderBy: {
            createdAt: 'desc',
            },
        }),

        this.prisma.fashionItem.count({
            where,
        }),
        ]);

    return {
        data: items,

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
    updateFashionItemDto: UpdateFashionItemDto,
    ) {
    await this.findOne(id);

    const existingItem =
    await this.findOne(id);

    await this.validateRelations(
    updateFashionItemDto.categoryId ??
        existingItem.categoryId,

    updateFashionItemDto.styleId ??
        existingItem.styleId,

    updateFashionItemDto.colorId ??
        existingItem.colorId,
    );

    const data: any = {
        ...updateFashionItemDto,
    };

    if (updateFashionItemDto.name) {
        data.slug = slugify(
        updateFashionItemDto.name,
        {
            lower: true,
            strict: true,
            trim: true,
        },
        );
    }

    return this.prisma.fashionItem.update({
        where: {
        id,
        },

        data,

        include: {
        category: true,
        style: true,
        color: true,
        },
    });
    }

    async remove(id: string) {
    await this.findOne(id);

    return this.prisma.fashionItem.delete({
        where: {
        id,
        },
    });
    }
}