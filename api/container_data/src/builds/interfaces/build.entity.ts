import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsInt, IsNotEmpty} from "class-validator";
import { BuildType } from "./build_type.entity";

@Entity()
export class Build {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    name: string;

    @ManyToOne(() => BuildType, buildType => buildType.builds, { eager: true })
    type: BuildType;

    @Column()
    @IsInt()
    file_size: number;

    @Column()
    @IsNotEmpty()
    file_path: string;

    @Column({ default: true })
    enabled: boolean;
}
