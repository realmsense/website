import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Build {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column({ default: true })
  active: boolean;
}