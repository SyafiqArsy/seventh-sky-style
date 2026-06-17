import {Get,Req,UseGuards,} from '@nestjs/common';
import {ApiBearerAuth,} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import {Body,Controller,Post,} from '@nestjs/common';
import {ApiOperation,ApiTags,} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @ApiOperation({
        summary: 'Register new user',
    })
    @Post('register')
    async register(
        @Body() registerDto: RegisterDto,
    ) {
        return this.authService.register(
        registerDto,
        );
    }

    @ApiOperation({
    summary: 'Login user',
    })
    @Post('login')
    async login(
    @Body() loginDto: LoginDto,
    ) {
    return this.authService.login(loginDto);
    }

    @ApiBearerAuth()

    @UseGuards(JwtAuthGuard)
    
    @Get('me')
    async me(@Req() req: any) {
    return req.user;
    }
}