import { Controller, Get, Request } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("user")
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Get("profile")
    async getProfile(@Request() req) {
        return req.user;
    }
}
