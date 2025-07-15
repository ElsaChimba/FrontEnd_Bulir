import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  @IsString()
  serviceId: string;

  @IsNotEmpty()
  @IsNumber()
  tableCount: number;
}
