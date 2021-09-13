import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity('state')
export class State {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;



}