
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as fs from "fs"
import { EntityNotFoundError, Repository } from "typeorm";
import { Build } from "./interfaces/build.entity";
import { Response } from "express";
import { BuildType, CreateBuildTypeDTO } from "./interfaces/build_type.entity";

@Injectable()
export class BuildsService {

    constructor(
        @InjectRepository(Build)
        private buildsRepository: Repository<Build>,
        @InjectRepository(BuildType)
        private buildsTypesRepository: Repository<BuildType>,
    ) { }

    async create(build: Build) {
        if (!fs.existsSync(build.file_path)) {
            throw new ConflictException(`Unable to find the build's file path: '${build.file_path}'. Make sure it is uploaded before creating the build.`);
        }

        // TODO: should be sending build type as a JSON object... maybe
        const buildTypeName = build.type as unknown as string;
        const buildType = await this.findBuildType(buildTypeName);
        if (!buildType) {
            throw new ConflictException(`Unable to find Build Type '${buildTypeName}'`);
        }

        const insertResult = await this.buildsRepository.insert(build);
        return this.find(insertResult.identifiers[0].id);
    }

    createType(createBuildType: CreateBuildTypeDTO) {
        const buildType: BuildType = {
            ...createBuildType,
            builds: []
        };

        this.buildsTypesRepository.insert(buildType);
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

    findAllBuildTypes(): Promise<BuildType[]> {
        return this.buildsTypesRepository.find();
    }

    findBuildType(name: string): Promise<BuildType> {
        return this.buildsTypesRepository.findOne({name});
    }

    findAll(): Promise<Build[]> {
        return this.buildsRepository.find();
    }

    findEnabled(): Promise<Build[]> {
        return this.buildsRepository.find({enabled: true});
    }
}
