
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BuildsController } from "./builds.controller";
import { BuildsService } from "./builds.service";
import { Build } from "./models/build.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Build])],
    controllers: [BuildsController],
    providers: [BuildsService],
})
export class BuildsModule { }
