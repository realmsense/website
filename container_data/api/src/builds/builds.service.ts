
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Build } from "./interfaces/build.entity";

@Injectable()
export class BuildsService {

    constructor(
        @InjectRepository(Build)
        private buildsRepository: Repository<Build>,
    ) {}

    create(build: Build) {
        this.buildsRepository.insert(build);
    }

    async disable(id: string): Promise<Build> {
        const buildEntity = await this.buildsRepository.findOneOrFail(id);
        buildEntity.active = false;
        return this.buildsRepository.save(buildEntity);
    }

    findAll(): Promise<Build[]> {
        return this.buildsRepository.find();
    }
}
