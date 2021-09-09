import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Customer } from './entities/customer.entity';
import { CustomerService } from './customer/customer.service';
import { CustomerController } from './customer/customer.controller';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    TypeOrmModule.forFeature([Customer]),

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