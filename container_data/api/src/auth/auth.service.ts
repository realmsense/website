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
        // TODO: use bcrypt, instead of storing/checking plaintext password
        // just hash this password, and compare with the stored one in the db.
        if (user && user.password == password) {
            delete user.password; // remove password from user
            return user;
        }
        return null;
    }

    async login(user: User) {
        const payload = { username: user.username, sub: user.id };
        return { access_token: this.jwtService.sign(payload) };
    }

}
