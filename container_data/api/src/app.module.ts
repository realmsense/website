import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { BuildsModule } from "./builds/builds.module";

@Module({
    imports: [
        BuildsModule,
        TypeOrmModule.forRoot() // see ormconfig.json
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule { }
