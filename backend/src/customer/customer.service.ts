import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult, Not, Equal } from 'typeorm';
import { pick } from "lodash"
import { Brackets } from "typeorm";
import { Customer } from '../entities/customer.entity';
import { Pagination } from '../class'
import { JwtService } from '@nestjs/jwt';
import * as request from 'supertest';
var CryptoJS = require("crypto-js");

@Injectable()
export class CustomerService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>
    ) { }

    async create(payload, type = null): Promise<any> {
        try {

            if (payload.firstname) {
                //check for already exist
                let customerCount;
                if (payload.id) {
                    customerCount = this.customerRepository.count({
                        where: { email: payload.email, id: Not(Equal(payload.id)) }
                    });
                } else {
                    customerCount = this.customerRepository.count({ where: { email: payload.email } });
                }

                let res = customerCount.then(customerCount => {
                    if (customerCount > 0) {
                        return {
                            status: false,
                            msg: 'Customer already exist.'
                        };
                    } else {
                        return {
                            status: true,
                            msg: 'Customer not exist.'
                        };
                    }
                });
                //if not exist
                if ((await res).status) {
                    let customer = new Customer();

                    if (payload.firstname) {
                        customer.firstname = payload.firstname;
                    }
                    if (payload.lastname) {
                        customer.lastname = payload.lastname;
                    }
                    if (payload.email) {
                        customer.email = payload.email;
                    }
                    if (payload.phone) {
                        customer.phone = payload.phone;
                    }
                    if (payload.communication_method) {
                        customer.communication_method = payload.communication_method;
                    }
                    if (payload.vehicles_details) {
                        customer.vehicles_details = payload.vehicles_details;
                    }
                    if (payload.service_locations) {
                        customer.service_locations = payload.service_locations;
                    }




                    if (payload.id) {
                        await this.customerRepository.update(payload.id, customer);
                        return {
                            status: true,
                            msg: 'Customer details updated successfully.'
                        };
                    } else {

                        var ciphertext = CryptoJS.AES.encrypt(payload.password, payload.email).toString();
                        customer.password = ciphertext;

                        let data = await this.customerRepository.save(customer);

                        payload.id = data.id;
                        return {
                            status: true,
                            msg: 'Customer added successfully.'
                        };
                    }
                    // topic = await this.findOne({ id: payload.id });
                } else {
                    return (await res);
                }
            }
        } catch (error) {
            throw error;
        }
    }


    async getAll(request) {
        try {

            const query = await this.customerRepository.createQueryBuilder('customers');
            if (request.order != undefined && request.order && request.order != '') {
                let order = JSON.parse(request.order);
                query.orderBy(`${order.firstname}`, order.direction.toUpperCase());
            } else {
                query.orderBy('id', 'ASC');
            }

            if (request.filter && request.filter != '') {
                query.andWhere(`customers.firstname LIKE :f`, { f: `${request.filter}%` })
            }
            let limit = 10;

            if (request && request.limit) {
                limit = request.limit;
            }
            let page = 0;
            if (request && request.page) {
                page = request.page
            }

            request = pick(request, ['id', 'firstname']);

            this.bindDataTableQuery(request, query);

            let response = await (new Pagination(query, Customer).paginate(limit, page));

            return response;
        } catch (error) {
            throw error;
        }
    }

    async loginUser(payload, type = null): Promise<any> {
        const user = await this.find_one(payload.email);

        if (!user) {
            throw new BadRequestException("Invalid Crediantials");
        }
        else {
            var bytes = CryptoJS.AES.decrypt(user.password, payload.email);
            var originalText = bytes.toString(CryptoJS.enc.Utf8);
            if (originalText == payload.password) {
                const jwt = await this.jwtService.signAsync({ id: user.id });
                console.log(jwt)
                return {
                    status: true,
                    msg: 'Login Successfull',
                    fcmToken: jwt
                };
            }
            else {
                throw new BadRequestException("Invalid Crediantials");
            }
        }
    }

    async find_one(email: string): Promise<Customer> {
        return this.customerRepository.findOne({
            where: {
                email,
            },
        });
    }
    async findUser(cond: any): Promise<Customer> {
        return this.customerRepository.findOne(cond);
    }
    async getLoggedInUser(request) {
        try {

            const cookie = request.cookies['jwt'];

            const data = await this.jwtService.verifyAsync(cookie);
            if (!data) {
                throw new UnauthorizedException();
            }
            const user = await this.findUser({ id: data['id'] });
            const { password, ...result } = user;

            return result;
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    async update(contact: Customer): Promise<UpdateResult> {

        return await this.customerRepository.update(contact.id, contact);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.customerRepository.delete(id);
    }

    bindDataTableQuery(input: any, query: any = {}) {
        query.where = query.where || [];
        let tablePath = query.expressionMap.aliases[0].firstname;

        if (input.filter) {

            if (input.filter_in) {
                query.andWhere(new Brackets((qb: any) => {
                    for (let index = 0; index < input.filter_in.length; index++) {
                        const filter = input.filter_in[index];

                        switch (filter.type) {
                            case "int":
                                let inputFilter = parseFloat(input.filter.replace(/[^0-9.-]+/g, ""));
                                if (Number.isInteger(inputFilter)) {
                                    qb.orWhere(`${filter.firstname} like '%${inputFilter}%'`)
                                }
                                break;
                            default:
                                qb.orWhere(`${filter.firstname} like '%${input.filter}%'`)
                                break;
                        }
                    }
                }))
            }
        }
    }


}