
import { Body, Controller, Get, Header, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Res, UploadedFile, UseGuards, UseInterceptors, Request } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { BuildsService } from "./builds.service";
import { Build } from "./interfaces/build.entity";
import { Response } from "express";
import { RequirePermission } from "src/auth/permissions/permission.decorator";
import { Permission } from "src/auth/permissions/permission.enum";
import { BuildType, CreateBuildTypeDTO } from "./interfaces/build_type.entity";
import { SkipJWTAuth } from "src/auth/constants";

@Controller("builds")
export class BuildsController {

    constructor(private buildsService: BuildsService) { }

    @Put("upload")
    @RequirePermission(Permission.MANAGE_BUILDS)
    @HttpCode(201)
    @UseInterceptors(
        FileInterceptor("file", { storage: diskStorage({ destination: "./build_uploads" }) })
    )
    async upload(@UploadedFile() file: Express.Multer.File) {
        if (!file)
            throw new HttpException("Missing File", HttpStatus.UNPROCESSABLE_ENTITY);

        return file;
    }

    @Post("create")
    @RequirePermission(Permission.MANAGE_BUILDS)
    async create(@Body() build: Build) {
        return this.buildsService.create(build);
    }

    @Post("disable")
    @RequirePermission(Permission.MANAGE_BUILDS)
    async disable(
        @Request() request,
        @Query("id", ParseIntPipe) id: number
    ) {
        return this.buildsService.disable(request.user, id);
    }

    @Get("download")
    async download(
        @Query("id", ParseIntPipe) buildId: number,
        @Request() request,
        @Res() response: Response
    ) {
        const data = await this.buildsService.getBuildFile(request.user, buildId);
        data.pipe(response);
    }

    @Get()
    async find(
        @Request() request,
        @Query("id", ParseIntPipe) id: number
    ) {
        return this.buildsService.getBuilds(request.user, id);
    }

    @Get("all")
    @RequirePermission(Permission.MANAGE_BUILDS)
    async findAll(): Promise<Build[]> {
        return this.buildsService.getAllBuilds();
    }

    @Get("enabled")
    async findEnabled(
        @Request() request,
    ) {
        return this.buildsService.getBuilds(request.user);
    }

    // Build Types
    @Post("createType")
    @RequirePermission(Permission.MANAGE_BUILDS)
    async createType(@Body() buildType: CreateBuildTypeDTO) {
        return this.buildsService.createType(buildType);
    }

    @Get("types")
    async findAllBuildTypes(): Promise<BuildType[]> {
        return this.buildsService.findAllBuildTypes();
    }

    @Get("type")
    async findType(@Query("name") name: string): Promise<BuildType> {
        console.log(name);
        return this.buildsService.findBuildType(name);
    }

}
