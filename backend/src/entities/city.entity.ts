import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { State } from './state.entity';
@Entity('city')
export class City {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    state_id: number;
    @ManyToOne(() => State)
    @JoinColumn({ name: "state_id", referencedColumnName: "id" })
    state: State;


}