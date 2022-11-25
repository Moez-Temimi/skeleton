import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInCredentialsDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
