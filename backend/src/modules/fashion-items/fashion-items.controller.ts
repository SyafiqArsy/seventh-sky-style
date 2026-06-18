import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { FashionItemsService } from './fashion-items.service';

import { CreateFashionItemDto } from './dto/create-fashion-item.dto';
import { UpdateFashionItemDto } from './dto/update-fashion-item.dto';
import { FashionItemQueryDto } from './dto/fashion-item-query.dto';

import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Fashion Items')
@Controller('fashion-items')
export class FashionItemsController {
  constructor(
    private readonly fashionItemsService: FashionItemsService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Get all fashion items',
  })
  async findAll(
    @Query() query: FashionItemQueryDto,
  ) {
    return this.fashionItemsService.findAll(
      query,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get fashion item by ID',
  })
  async findOne(
    @Param('id') id: string,
  ) {
    return this.fashionItemsService.findOne(
      id,
    );
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles('ADMIN')
  @ApiOperation({
    summary: 'Create fashion item',
  })
  @ApiResponse({
    status: 201,
    description:
      'Fashion item created successfully',
  })
  async create(
    @Body()
    createFashionItemDto: CreateFashionItemDto,
  ) {
    return this.fashionItemsService.create(
      createFashionItemDto,
    );
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles('ADMIN')
  @ApiOperation({
    summary: 'Update fashion item',
  })
  async update(
    @Param('id') id: string,
    @Body()
    updateFashionItemDto: UpdateFashionItemDto,
  ) {
    return this.fashionItemsService.update(
      id,
      updateFashionItemDto,
    );
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles('ADMIN')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete fashion item',
  })
  async remove(
    @Param('id') id: string,
  ) {
    return this.fashionItemsService.remove(
      id,
    );
  }
}