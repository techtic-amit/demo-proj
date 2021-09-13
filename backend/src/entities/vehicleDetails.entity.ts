import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Make } from './make.entity';
import { Model } from './model.entity';

@Entity('vehicle_details')
export class VehicleDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    vin: string;


    @Column()
    make_id: number;
    @ManyToOne(() => Make)
    @JoinColumn({ name: "make_id", referencedColumnName: "id" })
    make: Make;

    @Column()
    model_id: number;
    @ManyToOne(() => Model)
    @JoinColumn({ name: "model_id", referencedColumnName: "id" })
    model: Model;

    @Column()
    mileage: string;
}