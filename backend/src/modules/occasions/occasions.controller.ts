import { Controller, Get, Post, Patch, Delete, Body, Param, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { OccasionsService } from './occasions.service';
import { CreateOccasionDto } from './dto/create-occasion.dto';
import { UpdateOccasionDto } from './dto/update-occasion.dto';

import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Occasions')
@Controller('occasions')
export class OccasionsController {
  constructor(private readonly occasionsService: OccasionsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all occasions' })
  @ApiResponse({ status: 200, description: 'Return all occasions' })
  async findAll() {
    return this.occasionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an occasion by ID' })
  @ApiResponse({ status: 200, description: 'Return the occasion' })
  @ApiResponse({ status: 404, description: 'Occasion not found' })
  async findOne(@Param('id') id: string) {
    return this.occasionsService.findOne(id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Create a new occasion' })
  @ApiResponse({ status: 201, description: 'Occasion created successfully' })
  async create(@Body() createOccasionDto: CreateOccasionDto) {
    return this.occasionsService.create(createOccasionDto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Update an occasion' })
  @ApiResponse({ status: 200, description: 'Occasion updated successfully' })
  @ApiResponse({ status: 404, description: 'Occasion not found' })
  async update(@Param('id') id: string, @Body() updateOccasionDto: UpdateOccasionDto) {
    return this.occasionsService.update(id, updateOccasionDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an occasion' })
  @ApiResponse({ status: 204, description: 'Occasion deleted successfully' })
  @ApiResponse({ status: 404, description: 'Occasion not found' })
  async remove(@Param('id') id: string) {
    return this.occasionsService.remove(id);
  }
}
