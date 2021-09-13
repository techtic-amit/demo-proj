import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity('model')
export class Model {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    model: string;



}