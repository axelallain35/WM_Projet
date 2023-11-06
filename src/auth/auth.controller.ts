import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {}
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() request) {
        return this.authService.login(request.user);
    }
}
