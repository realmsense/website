import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller("auth")
export class AuthController {

    @Post("login")
    // @UseGuards(AuthGuard("local"))
    @UseGuards(LocalAuthGuard)
    async login(@Request() req) {
        return req.user;
    }
}
