
import { Injectable } from "@nestjs/common";
import { Build } from "./interfaces/build.interface";

@Injectable()
export class BuildsService {
    private readonly builds: Build[] = [];

    create(build: Build) {
        this.builds.push(build);
    }

    findAll(): Build[] {
        return this.builds;
    }
}
