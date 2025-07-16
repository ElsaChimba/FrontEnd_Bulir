import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: { serviceId: string; details: Record<string, any> }, @Request() req) {
    return this.reservationsService.create(body.serviceId, body.details, req.user);
  }

  @UseGuards(JwtAuthGuard)
@Get('me')
findMine(@Request() req) {
  return this.reservationsService.findByClient(req.user);
}

}
