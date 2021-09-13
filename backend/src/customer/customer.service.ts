import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult, Not, Equal } from 'typeorm';
import { pick } from "lodash"
import { Brackets } from "typeorm";
import { Customer } from '../entities/customer.entity';
import { Pagination } from '../class'
import { JwtService } from '@nestjs/jwt';
import { ServiceDetail } from '../entities/ServiceDetails.entity';
import { getConnection } from "typeorm";
import { Make } from 'src/entities/make.entity';
import { Model } from 'src/entities/model.entity';
import { VehicleDetail } from 'src/entities/vehicleDetails.entity';
import { City } from 'src/entities/city.entity';
import * as request from 'supertest';
import { State } from '../entities/state.entity';
var CryptoJS = require("crypto-js");

@Injectable()
export class CustomerService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>,
        @InjectRepository(ServiceDetail)
        private serviceRepository: Repository<ServiceDetail>,
        @InjectRepository(Make)
        private makeeRepository: Repository<Make>,
        @InjectRepository(Model)
        private modelRepository: Repository<Model>,
        @InjectRepository(VehicleDetail)
        private vehicleRepository: Repository<VehicleDetail>,
        @InjectRepository(City)
        private cityRepository: Repository<City>,
        @InjectRepository(State)
        private stateRepository: Repository<State>,

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
                    if (payload.communicationMethod) {
                        customer.communication_method = payload.communicationMethod;
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
    async getDropDownDataMake(request: any) {
        const data = this.makeeRepository.find();
        return data;
    }
    async getDropDownDataState(request: any) {
        const data = this.stateRepository.find();
        return data;
    }

    async getDropDownDataModel(request: any) {
        const data = this.modelRepository.find();
        return data;
    }
    async getDropDownCity(request: any, stateId) {
        const data = this.cityRepository.find({ state_id: stateId });
        return data;
    }
    async insertService(payload, type = null, customerId): Promise<any> {
        try {

            let service = new ServiceDetail();
            //if not exist

            if (payload.nickname) {
                service.nickname = payload.nickname;
            }
            if (payload.address1) {
                service.address1 = payload.address1;
            }
            if (payload.address2) {
                service.address2 = payload.address2;
            }
            if (payload.cityName.name) {
                service.city = payload.cityName.name;
            }
            if (payload.stateName.name) {
                service.state = payload.stateName.name;
            }

            if (payload.date) {
                service.date = payload.date;
            }

            if (payload.ven) {
                service.venue = payload.ven;
            }

            if (payload.zip) {
                service.zip = payload.zip;
            }

            if (customerId) {
                service.customer_id = customerId;
            }




            if (payload.id) {
                await this.serviceRepository.update(payload.id, service);
                return {
                    status: true,
                    msg: 'service details updated successfully.'
                };
            } else {

                await this.serviceRepository.save(service);
                return {
                    status: true,
                    msg: 'service details added successfully.'
                };
            }
        } catch (error) {
            throw error;
        }
    }

    async insertVehicleDetails(payload, type = null): Promise<any> {
        try {

            let service = new VehicleDetail();
            //if not exist

            if (payload.vin) {
                service.vin = payload.vin;
            }
            if (payload.makeYear.id) {
                service.make_id = payload.makeYear.id;
            }
            if (payload.modelName.id) {
                service.model_id = payload.modelName.id;
            }
            if (payload.mileage) {
                service.mileage = payload.mileage;
            }



            if (payload.id) {
                await this.vehicleRepository.update(payload.id, service);
                return {
                    status: true,
                    msg: 'Vehicle details updated successfully.'
                };
            } else {

                await this.vehicleRepository.save(service);
                return {
                    status: true,
                    msg: 'Vehicle details added successfully.'
                };
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