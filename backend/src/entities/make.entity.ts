import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity('make')
export class Make {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    year: string;



}