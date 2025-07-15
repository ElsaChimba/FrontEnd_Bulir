import { Controller, Post, Body, UseGuards, Request, Get, Req } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  @UseGuards(new JwtAuthGuard('jwt'))
  create(@Body() body: { serviceId: string; tableTypeId: string }, @Req() req) {
    return this.reservationsService.create(body.serviceId, body.tableTypeId, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.reservationsService.findAll();
  }
}
