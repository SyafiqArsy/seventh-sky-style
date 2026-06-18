import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,Get,Patch,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

import { ProfilesService } from './profiles.service';

import { CreateProfileDto } from './dto/create-profile.dto';

import { UpdateProfileDto } from './dto/update-profile.dto';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(
    private readonly profilesService: ProfilesService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({
    summary: 'Create user profile',
  })
  async create(
    @Req() req: any,
    @Body() dto: CreateProfileDto,
  ) {
    return this.profilesService.create(
      req.user.sub,
      dto,
    );
  }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('me')
    @ApiOperation({
    summary: 'Get my profile',
    })
    async findMyProfile(
    @Req() req: any,
    ) {
    return this.profilesService.findMyProfile(
        req.user.sub,
    );
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Patch()
    @ApiOperation({
    summary: 'Update profile',
    })
    async update(
    @Req() req: any,
    @Body() dto: UpdateProfileDto,
    ) {
    return this.profilesService.update(
        req.user.sub,
        dto,
    );
    }
}