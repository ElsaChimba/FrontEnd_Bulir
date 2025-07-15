import { Module } from '@nestjs/common';
import { ServicesModule } from './services/services.module'; 
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ReservationsModule } from './reservations/reservations.module';

@Module({
  imports: [
     ConfigModule.forRoot({ isGlobal: true }),
  UsersModule, AuthModule, ServicesModule, ReservationsModule,
    ReservationsModule,
  ],
})
export class AppModule {}



