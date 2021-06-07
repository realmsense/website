
import { Body, Controller, Get, Header, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { BuildsService } from "./builds.service";
import { Build } from "./models/build.entity";
import { Response } from "express";
import { AuthKeyGuard } from "src/auth/guards/authkey.guard";

const PRIVATE_KEY = "Wmjg4Yg4vzMLGGK9ahrMY3BFayRmEwRDLxD5i9CdLTs4VyKKSrEZ4G7Rk5GQCFyu";

@Controller("builds")
export class BuildsController {

    constructor(private buildsService: BuildsService) { }

    @Put("upload")
    @UseGuards(AuthKeyGuard(PRIVATE_KEY))
    @UseInterceptors(
        FileInterceptor("file", { storage: diskStorage({ destination: "./build_uploads" }) })
    )
    async upload(@UploadedFile() file: Express.Multer.File) {
        if (!file)
            throw new HttpException("Missing File", HttpStatus.UNPROCESSABLE_ENTITY);

        return file;
    }

    @Post("create")
    @UseGuards(AuthKeyGuard(PRIVATE_KEY))
    async create(@Body() build: Build) {
        this.buildsService.create(build);
    }

    @Post("disable")
    @UseGuards(AuthKeyGuard(PRIVATE_KEY))
    async disable(@Query("id") id: string) {
        this.buildsService.disable(id);
    }

    // TODO: needs user authentication
    // TODO: need to validate input
    @Get("download")
    // @HttpCode(HttpStatus.OK)
    // @Header("Content-Type", "image/png")
    // @Header("Content-Disposition", "attachment; filename=test.png")
    async sex(@Query("file_path") file_path: string, @Res() response: Response) {
        return this.buildsService.download(file_path, response);
    }

    @Get()
    async find(@Query("id", ParseIntPipe) id: string) {
        return this.buildsService.find(id);
    }

    @Get("all")
    async findAll(): Promise<Build[]> {
        return this.buildsService.findAll();
    }

    @Get("enabled")
    async findEnabled(): Promise<Build[]> {
        return this.buildsService.findEnabled();
    }
}
