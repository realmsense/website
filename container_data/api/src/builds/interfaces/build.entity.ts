import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsBase64, IsInt, isNotEmpty, IsNotEmpty, IsNumber, IsNumberString } from "class-validator";

@Entity()
export class Build {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    name: string;

    @Column()
    @IsNotEmpty()
    url: string;

    @Column()
    @IsInt()
    file_size: number;

    @Column()
    @IsNotEmpty()
    file_path: string;

    @Column({ default: true })
    enabled: boolean;
}
