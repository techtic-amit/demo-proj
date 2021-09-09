import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity('customers')
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    communication_method: string;

    @Column()
    vehicles_details: string;

    @Column()
    service_locations: string;

    @Column()
    password: string;


}