import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './interfaces/user.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private buildsRepository: Repository<User>,
    ) { }

    async findOne(username: string): Promise<User | undefined> {
        return this.buildsRepository.findOne({username});
    }
}
