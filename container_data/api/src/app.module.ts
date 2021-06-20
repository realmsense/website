import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { BuildsModule } from "./builds/builds.module";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        BuildsModule,
        TypeOrmModule.forRoot(),
        AuthModule,
        UsersModule // see ormconfig.json
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule { }
