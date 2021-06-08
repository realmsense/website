import * as bcrypt from "bcrypt";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/users/interfaces/user.entity";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, password: string): Promise<User> {
        const user = await this.usersService.findOne(username);
        if (user && bcrypt.compareSync(password, user.password)) {
            delete user.password; // remove password from user
            return user;
        }
        return null;
    }

    async login(user: User) {
        const payload = { username: user.username, sub: user.id };
        return this.jwtService.sign(payload);
    }

    async register(username: string, password: string) {
        const hash = await bcrypt.hash(password, 10);
        this.usersService.insert({username, password: hash});
    }

}
