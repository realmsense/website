
import { Body, Controller, Get, Post } from "@nestjs/common";
import { BuildsService } from "./builds.service";
import { Build } from "./interfaces/build.interface";

@Controller("builds")
export class BuildsController {

    private buildsService: BuildsService;

    constructor(buildsService: BuildsService) {
        this.buildsService = buildsService;
    }

    @Post()
    async create(@Body() build: Build) {
        console.log(build);
        this.buildsService.create(build);
    }

    @Get()
    async findAll(): Promise<Build[]> {
        return this.buildsService.findAll();
    }
}