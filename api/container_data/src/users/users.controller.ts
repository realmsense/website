import { Body, Controller, Get, ParseIntPipe, Put, Query, Request } from "@nestjs/common";
import { RequirePermission } from "src/auth/permissions/permission.decorator";
import { Permission } from "src/auth/permissions/permission.enum";
import { User } from "./interfaces/user.entity";
import { UsersService } from "./users.service";

@Controller("user")
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Get("profile")
    async getProfile(@Request() req) {
        return req.user;
    }

    @Get("all")
    @RequirePermission(Permission.MANAGE_USERS)
    async getAll() {
        return this.usersService.findAll();
    }

    @Put("update")
    @RequirePermission(Permission.MANAGE_USERS)
    async update(
        @Query("id", ParseIntPipe) id :number,
        @Body() updatedUser: Partial<User>
    ) {
        return this.usersService.update(id, updatedUser);
    }
}
