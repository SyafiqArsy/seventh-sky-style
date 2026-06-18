import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OccasionsService } from './occasions.service';
import { CreateOccasionDto } from './dto/create-occasion.dto';
import { UpdateOccasionDto } from './dto/update-occasion.dto';

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
  @ApiOperation({ summary: 'Create a new occasion' })
  @ApiResponse({ status: 201, description: 'Occasion created successfully' })
  async create(@Body() createOccasionDto: CreateOccasionDto) {
    return this.occasionsService.create(createOccasionDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an occasion' })
  @ApiResponse({ status: 200, description: 'Occasion updated successfully' })
  @ApiResponse({ status: 404, description: 'Occasion not found' })
  async update(@Param('id') id: string, @Body() updateOccasionDto: UpdateOccasionDto) {
    return this.occasionsService.update(id, updateOccasionDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an occasion' })
  @ApiResponse({ status: 204, description: 'Occasion deleted successfully' })
  @ApiResponse({ status: 404, description: 'Occasion not found' })
  async remove(@Param('id') id: string) {
    return this.occasionsService.remove(id);
  }
}
