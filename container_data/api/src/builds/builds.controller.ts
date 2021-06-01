
import { Body, Controller, Get, Post } from "@nestjs/common";
import { Connection } from "typeorm";
import { BuildsService } from "./builds.service";
import { Build } from "./interfaces/build.entity";

@Controller("builds")
export class BuildsController {

    private connection: Connection;
    private buildsService: BuildsService;

    constructor(buildsService: BuildsService) {
        this.buildsService = buildsService;
    }

    @Post("create")
    async create(@Body() build: Build) {
        console.log(build);
        this.buildsService.create(build);
    }

    @Post("disable")
    async disable(@Body() id: string) {
        this.buildsService.disable(id);
    }

    @Get()
    async findAll(): Promise<Build[]> {
        return this.buildsService.findAll();
    }
}