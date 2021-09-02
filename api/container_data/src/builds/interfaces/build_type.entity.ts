import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { IsNotEmpty} from "class-validator";
import { Build } from "./build.entity";
import { OmitType } from "@nestjs/swagger";

@Entity()
export class BuildType {

    @PrimaryColumn()
    @IsNotEmpty()
    name: string;

    @OneToMany(() => Build, build => build.type)
    builds: Build[];

    @Column()
    @IsNotEmpty()
    webhook_url: string;

    @Column("longtext")
    @IsNotEmpty()
    embed_template: string;
}

export class CreateBuildTypeDTO extends OmitType(BuildType, ["builds"] as const) {}
