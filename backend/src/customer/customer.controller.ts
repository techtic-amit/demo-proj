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
    async getAllCustomer(@Request() request: any, @Res() res: Response): Promise<any> {
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
    @Get('getMakeData')
    @ApiOkResponse({ description: 'Successfully authenticated' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async getMakeData(@Request() request: any, @Res() res: Response): Promise<any> {
        return await this.CustomerService.getDropDownDataMake(request.query)
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
    @Get('getStateData')
    @ApiOkResponse({ description: 'Successfully authenticated' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async getStateData(@Request() request: any, @Res() res: Response): Promise<any> {
        return await this.CustomerService.getDropDownDataState(request.query)
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
    @Get('getCityData/:state_id')
    @ApiOkResponse({ description: 'Successfully authenticated' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async getCityData(@Request() request: any, @Param('state_id') id, @Res() res: Response): Promise<any> {
        return await this.CustomerService.getDropDownCity(request.query, id)
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

    @Get('getModelData')
    @ApiOkResponse({ description: 'Successfully authenticated' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async getModelData(@Request() request: any, @Res() res: Response): Promise<any> {
        return await this.CustomerService.getDropDownDataModel(request.query)
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
    @Delete('delete/:id')
    async delete(@Param('id') id): Promise<any> {
        return this.CustomerService.delete(id);
    }
    @Post('insert-service/:id')
    @ApiOkResponse({ description: 'Successfully authenticated' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async insertService(

        @Request() request: any,
        @Param('id') id,
        @Body() body: any,

        @Res() res: Response,
    ): Promise<any> {
        let type = body.type ? body.type : null;
        console.log(body);
        return await this.CustomerService
            .insertService(body, type, id)
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


    @Post('insert-vehicle')
    @ApiOkResponse({ description: 'Successfully authenticated' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async insertVehicle(

        @Request() request: any,
        @Body() body: any,

        @Res() res: Response,
    ): Promise<any> {
        let type = body.type ? body.type : null;

        return await this.CustomerService
            .insertVehicleDetails(body, type)
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

}
