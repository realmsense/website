
import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthKeyGuard } from "src/auth/authkey.guard";
import { Connection } from "typeorm";
import { BuildsService } from "./builds.service";
import { Build } from "./interfaces/build.entity";

const PRIVATE_KEY = "Wmjg4Yg4vzMLGGK9ahrMY3BFayRmEwRDLxD5i9CdLTs4VyKKSrEZ4G7Rk5GQCFyu";

@Controller("builds")
export class BuildsController {

    private buildsService: BuildsService;

    constructor(buildsService: BuildsService) {
        this.buildsService = buildsService;
    }

    @Post("create")
    @UseGuards(AuthKeyGuard(PRIVATE_KEY))
    async create(@Body() build: Build) {
        this.buildsService.create(build);
    }

    @Post("disable")
    @UseGuards(AuthKeyGuard(PRIVATE_KEY))
    async disable(@Body() id: string) {
        this.buildsService.disable(id);
    }

    @Get()
    async findAll(): Promise<Build[]> {
        return this.buildsService.findAll();
    }
}
