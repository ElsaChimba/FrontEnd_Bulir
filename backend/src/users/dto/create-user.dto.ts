import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';

export enum Role {
  CLIENT = 'CLIENT',
  PROVIDER = 'PROVIDER',
}

export class CreateUserDto {
  senha(password: any, arg1: number) {
    throw new Error('Method not implemented.');
  }
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  @Length(9, 9, { message: 'O NIF deve ter exatamente 9 caracteres' })
  nif: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6, 20, { message: 'A senha deve ter entre 6 e 20 caracteres' })
  password: string;

  @IsEnum(Role)
  role: Role;
}
