import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Permission } from "src/auth/permissions/permission.enum";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    @IsNotEmpty()
    username?: string;

    @Column()
    @IsNotEmpty()
    password?: string;

    @Column({ type: "json", default: "[]" })
    @IsNotEmpty()
    permissions?: Permission[];

    @Column({ default: true })
    enabled?: boolean;
}
