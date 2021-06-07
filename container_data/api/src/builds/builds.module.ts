
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { BuildsController } from "./builds.controller";
import { BuildsService } from "./builds.service";
import { Build } from "./models/build.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Build])],
    controllers: [BuildsController],
    providers: [
        BuildsService,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard
        }
    ],
})
export class BuildsModule { }
