import { Controller, HttpCode, Post, Body } from '@nestjs/common';
import { AlertsGateway } from './alerts.gateway';

@Controller('alerts')
export class AlertsController {
    constructor(private alertGateway: AlertsGateway) { }

    @Post()
    @HttpCode(200)
    sendAlertToAll(@Body() dto: { message: string }) {
        this.alertGateway.sendToAll(dto.message);
        return dto;
    }
}
