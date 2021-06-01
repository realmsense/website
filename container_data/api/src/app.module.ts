import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { BuildsModule } from "./builds/builds.module";

@Module({
    imports: [BuildsModule],
    controllers: [AppController],
    providers: [],
})
export class AppModule { }
