import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Customer } from './customer.entity';
@Entity('service_details')
export class ServiceDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nickname: string;

    @Column()
    address1: string;

    @Column()
    address2: string;

    @Column()
    state: string;

    @Column()
    city: string;

    @Column()
    zip: string;

    @CreateDateColumn()
    public date: Date;

    @Column()
    venue: string;

    @Column()
    customer_id: number;
    @ManyToOne(() => Customer)
    @JoinColumn({ name: "customer_id", referencedColumnName: "id" })
    customer: Customer;
}