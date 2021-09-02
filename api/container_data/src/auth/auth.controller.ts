import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SkipJWTAuth } from "./constants";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { RegisterUserDto } from "./models/register-user.dto";

@Controller("auth")
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post("login")
    @SkipJWTAuth()
    @UseGuards(LocalAuthGuard)
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post("register")
    @SkipJWTAuth()
    async register(@Body() registerUserDto: RegisterUserDto) {
        return this.authService.register(registerUserDto.username, registerUserDto.password);
    }
}
