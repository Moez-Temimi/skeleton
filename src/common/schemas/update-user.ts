import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsNotEmpty()
  id: string;
  @IsOptional()
  readonly fullName: string;

  @IsOptional()
  @IsEmail()
  readonly email: string;

  @IsOptional()
  readonly phoneNumber: string;

  @IsOptional()
   password: string;

  @IsOptional()
  readonly role: string;
}
