
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { createReadStream } from "fs";
import { Repository } from "typeorm";
import { Build } from "./interfaces/build.entity";
import { Response } from "express";

@Injectable()
export class BuildsService {

    constructor(
        @InjectRepository(Build)
        private buildsRepository: Repository<Build>,
    ) { }

    async create(build: Build) {
        // TODO: validate that the file_path exists
        this.buildsRepository.insert(build);
    }

    async download(file_path: string, response: Response): Promise<void> {
        // TODO: validate that the file exists
        const data = createReadStream(file_path);
        data.pipe(response);
    }

    async disable(id: string): Promise<Build> {
        const buildEntity = await this.buildsRepository.findOneOrFail(id);
        buildEntity.enabled = false;
        return this.buildsRepository.save(buildEntity);
    }

    find(id: string): Promise<Build> {
        return this.buildsRepository.findOne(id);
    }

    findAll(): Promise<Build[]> {
        return this.buildsRepository.find();
    }

    findEnabled(): Promise<Build[]> {
        return this.buildsRepository.find({enabled: true});
    }
}
