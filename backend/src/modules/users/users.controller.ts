import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }
}