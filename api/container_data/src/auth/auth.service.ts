import * as bcrypt from "bcrypt";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/users/interfaces/user.entity";
import { UsersService } from "src/users/users.service";
import { jwtConstants } from "./constants";

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
        const timestamp = Math.floor(Date.now() / 1000);
        return {
            token: this.jwtService.sign(payload),
            expiration: timestamp + jwtConstants.expiration
        };
    }

    private async validateUsernamePassword(username: string, password: string) {
        // Username must only be letters and numbers
        const alphanumeric = /^[a-z0-9]+$/i;
        if (!alphanumeric.test(username)) {
            throw new HttpException("Username contains invalid characters. (Please use an alphanumeric string)", HttpStatus.BAD_REQUEST)
        }

        const MAX_USERNAME_LENGTH = 32;
        if (username.length > MAX_USERNAME_LENGTH) {
            throw new HttpException(`Username is too long. (Max ${MAX_USERNAME_LENGTH} characters)`, HttpStatus.BAD_REQUEST)
        }

        // https://en.wikipedia.org/wiki/Bcrypt#Maximum_password_length - (72 bytes == 72 chars)
        const MAX_PASSWORD_LENGTH = 72;
        if (password.length > MAX_PASSWORD_LENGTH) {
            throw new HttpException(`Password is too long. (Max ${MAX_PASSWORD_LENGTH} characters)`, HttpStatus.BAD_REQUEST)
        }

        const existingUser = await this.usersService.findOne(username);
        if (existingUser) {
            throw new HttpException(`Username "${username}" already in use!`, HttpStatus.CONFLICT);
        }
    }

    async register(username: string, password: string) {

        await this.validateUsernamePassword(username, password);

        // Insert the user in the DB
        const hash = await bcrypt.hash(password, 10);
        const newUser: User = {
            username: username,
            password: hash
        }
        this.usersService.insert(newUser);
    }
}