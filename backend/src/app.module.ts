import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Customer } from './entities/customer.entity';
import { ServiceDetail } from './entities/ServiceDetails.entity';

import { CustomerService } from './customer/customer.service';
import { CustomerController } from './customer/customer.controller';
import { Make } from './entities/make.entity';
import { Model } from './entities/model.entity';
import { VehicleDetail } from './entities/vehicleDetails.entity';
import { JwtModule } from '@nestjs/jwt';
import { City } from './entities/city.entity';
import { State } from './entities/state.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer, ServiceDetail, Make, Model, VehicleDetail, City, State]),

    TypeOrmModule.forRoot({
      type: 'mysql',
      database: 'customerDemo',
      username: 'root',
      password: '',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' }
    }),
  ],
  controllers: [AppController, CustomerController],
  providers: [AppService, CustomerService],
})
export class AppModule { }