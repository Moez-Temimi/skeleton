import { ApiProperty } from '@nestjs/swagger';
import {  IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  fullName: string;
 
  @ApiProperty({ type: 'string' })
  @IsEmail()
  email: string;
 
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  phoneNumber: string;
 
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  password: string;
 
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  role: string;
}
