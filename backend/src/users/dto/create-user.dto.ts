import { IsEmail, IsEnum, IsNotEmpty, IsString, Length, IsOptional } from 'class-validator';

export enum Role {
  CLIENT = 'CLIENT',
  PROVIDER = 'PROVIDER',
}

export class CreateUserDto {
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

  @IsOptional() 
  @IsEnum(Role, { message: 'Role deve ser CLIENT ou PROVIDER' })
  role?: Role;
}
