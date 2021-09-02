import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './interfaces/user.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async findOne(username: string): Promise<User | undefined> {
        return this.usersRepository.findOne({username: username});
    }

    async insert(user: User) {
        this.usersRepository.insert(user);
    }

    async update(id: number, updatedUser: User) {
        const foundUser = await this.usersRepository.findOne({id: id});
        if (!foundUser) {
            throw new NotFoundException(`No user found with ID ${id}`);
        }
        if (Object.keys(updatedUser).length == 0 ) {
            throw new BadRequestException("At least one updated value is required")
        }
        this.usersRepository.update(id, updatedUser);
    }

    async findAll(removePass = true): Promise<User[]> {
        const users = await this.usersRepository.find();
        if (removePass) {
            users.forEach((user) => delete user.password);
        }
        return users;
    }
}
