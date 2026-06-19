import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
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

import { OutfitsService } from './outfits.service';

import { AddOutfitItemDto } from './dto/add-outfit-item.dto';

import { CreateOutfitDto } from './dto/create-outfit.dto';
import { UpdateOutfitDto } from './dto/update-outfit.dto';
import { OutfitQueryDto } from './dto/outfit-query.dto';

import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Outfits')
@Controller('outfits')
export class OutfitsController {
  constructor(
    private readonly outfitsService: OutfitsService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Get all outfits',
  })
  async findAll(
    @Query() query: OutfitQueryDto,
  ) {
    return this.outfitsService.findAll(
      query,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get outfit by ID',
  })
  async findOne(
    @Param('id') id: string,
  ) {
    return this.outfitsService.findOne(id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles('ADMIN')
  @ApiOperation({
    summary: 'Create outfit',
  })
  @ApiResponse({
    status: 201,
    description:
      'Outfit created successfully',
  })
  async create(
    @Body()
    createOutfitDto: CreateOutfitDto,
  ) {
    return this.outfitsService.create(
      createOutfitDto,
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
    summary: 'Update outfit',
  })
  async update(
    @Param('id') id: string,
    @Body()
    updateOutfitDto: UpdateOutfitDto,
  ) {
    return this.outfitsService.update(
      id,
      updateOutfitDto,
    );
  }

  @Post(':id/items')
@ApiBearerAuth()
@UseGuards(
  JwtAuthGuard,
  RolesGuard,
)
@Roles('ADMIN')
@ApiOperation({
  summary: 'Add item to outfit',
})
async addItem(
  @Param('id') id: string,

  @Body()
  dto: AddOutfitItemDto,
) {
  return this.outfitsService.addItem(
    id,
    dto,
  );
}

@Delete(':id/items/:itemId')
@ApiBearerAuth()
@UseGuards(
  JwtAuthGuard,
  RolesGuard,
)
@Roles('ADMIN')
@ApiOperation({
  summary: 'Remove item from outfit',
})
async removeItem(
  @Param('id') id: string,

  @Param('itemId')
  itemId: string,
) {
  return this.outfitsService.removeItem(
    id,
    itemId,
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
    summary: 'Delete outfit',
  })
  async remove(
    @Param('id') id: string,
  ) {
    return this.outfitsService.remove(id);
  }
}