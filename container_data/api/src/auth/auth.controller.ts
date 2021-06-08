import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { LocalAuthGuard } from "./local-auth.guard";
import { RegisterUserDto } from "./models/register-user.dto";

@Controller("auth")
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post("login")
    @UseGuards(LocalAuthGuard)
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post("register")
    async register(@Body() registerUserDto: RegisterUserDto) {
        return this.authService.register(registerUserDto.username, registerUserDto.password);
    }

    @UseGuards(JwtAuthGuard)
    @Get("profile")
    getProfile(@Request() req) {
        return req.user;
    }
}
