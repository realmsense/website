
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as fs from "fs"
import { EntityNotFoundError, Repository } from "typeorm";
import { Build } from "./interfaces/build.entity";
import { Response } from "express";

@Injectable()
export class BuildsService {

    constructor(
        @InjectRepository(Build)
        private buildsRepository: Repository<Build>,
    ) { }

    async create(build: Build) {
        if (!fs.existsSync(build.file_path)) {
            throw new ConflictException(`Unable to find the build's file path: '${build.file_path}'. Make sure it is uploaded before creating the build.`);
        }

        this.buildsRepository.insert(build);
    }

    async getBuildFile(buildId: number): Promise<fs.ReadStream> {
        const build: Build = await this.find(buildId);
        if (!build) {
            throw new NotFoundException(`No build found with ID ${buildId}`);
        }

        if (!fs.existsSync(build.file_path)) {
            throw new InternalServerErrorException(`File not found for build '${build.name}'`);
        }

        return fs.createReadStream(build.file_path);
    }

    async disable(buildId: number): Promise<Build> {
        const build: Build = await this.find(buildId);
        if (!build) {
            throw new NotFoundException(`No build found with ID ${buildId}`);
        }

        build.enabled = false;
        return this.buildsRepository.save(build);
    }

    find(id: number): Promise<Build> {
        return this.buildsRepository.findOne({id});
    }

    findAll(): Promise<Build[]> {
        return this.buildsRepository.find();
    }

    findEnabled(): Promise<Build[]> {
        return this.buildsRepository.find({enabled: true});
    }
}
