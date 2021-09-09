import { Controller, UseGuards, Get, Put, Res, Request, HttpStatus, UnprocessableEntityException, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiOkResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { Customer } from '../entities/customer.entity';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
@Controller('customer')
export class CustomerController {
    constructor(private CustomerService: CustomerService) {
    }
    @Get('all')
    @ApiOkResponse({ description: 'Successfully authenticated' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async getAllTitle(@Request() request: any, @Res() res: Response): Promise<any> {
        return await this.CustomerService.getAll(request.query)
            .then(async output => {
                return res.status(HttpStatus.OK).json({
                    status: HttpStatus.OK,
                    data: output,
                });
            })
            .catch((error: any) => {
                throw new UnprocessableEntityException(error);
            });
    }

    @Post('update-customer')
    @ApiOkResponse({ description: 'Successfully authenticated' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async updateCustomer(
        @Request() request: any,
        @Body() body: any,
        @Res() res: Response,
    ): Promise<any> {
        let type = body.type ? body.type : null;
        return await this.CustomerService
            .create(body, type)
            .then(async reasons => {
                return res.status(HttpStatus.OK).json({
                    status: HttpStatus.OK,
                    data: reasons,
                });
            })
            .catch((error: any) => {
                throw new UnprocessableEntityException(error);
            });
    }

    @Post('login')
    @ApiOkResponse({ description: 'Successfully authenticated' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async Login(
        @Request() request: any,
        @Body() body: any,
        @Res({ passthrough: true }) res: Response,
    ): Promise<any> {
        let type = body.type ? body.type : null;
        return await this.CustomerService
            .loginUser(body, type)
            .then(async reasons => {
                res.cookie('jwt', reasons.fcmToken, { httpOnly: true })
                return {
                    message: "Success"
                }
                // return res.status(HttpStatus.OK).json({
                //     status: HttpStatus.OK,
                //     data: reasons,
                // });
            })
            .catch((error: any) => {
                throw new UnprocessableEntityException(error);
            });
    }

    @Get('loggedInUser')
    @ApiOkResponse({ description: 'Successfully authenticated' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async getLoggedInUser(@Request() request: any, @Res() res: Response): Promise<any> {
        return await this.CustomerService.getLoggedInUser(request)
            .then(async output => {
                return res.status(HttpStatus.OK).json({
                    status: HttpStatus.OK,
                    data: output,
                });
            })
            .catch((error: any) => {
                throw new UnprocessableEntityException(error);
            });
    }
    @Post('logout')
    @ApiOkResponse({ description: 'Successfully authenticated' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async Logout(
        @Request() request: any,
        @Body() body: any,
        @Res({ passthrough: true }) res: Response,
    ): Promise<any> {
        let type = body.type ? body.type : null;
        res.clearCookie('jwt');
        return {
            message: "Successfully logged out"
        }
    }
    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
        return this.CustomerService.delete(id);
    }
}
