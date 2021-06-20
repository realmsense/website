
import { Body, Controller, Get, Header, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { BuildsService } from "./builds.service";
import { Build } from "./interfaces/build.entity";
import { Response } from "express";
import { createReadStream } from "fs";

@Controller("builds")
export class BuildsController {

    constructor(private buildsService: BuildsService) { }

    @Put("upload")
    @HttpCode(201)
    @UseInterceptors(
        FileInterceptor("file", { storage: diskStorage({ destination: "./build_uploads" }) })
    )
    async upload(@UploadedFile() file: Express.Multer.File) {
        if (!file)
            throw new HttpException("Missing File", HttpStatus.UNPROCESSABLE_ENTITY);

        return file;
    }

    @Get("download")
    async download(@Query("id", ParseIntPipe) buildId: number, @Res() response: Response) {
        const data = await this.buildsService.getBuildFile(buildId);
        data.pipe(response);
    }

    @Post("create")
    async create(@Body() build: Build) {
        return this.buildsService.create(build);
    }

    @Post("disable")
    async disable(@Query("id", ParseIntPipe) id: number) {
        return this.buildsService.disable(id);
    }

    @Get()
    async find(@Query("id", ParseIntPipe) id: number) {
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
