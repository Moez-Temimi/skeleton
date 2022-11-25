import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsNotEmpty()
  id: string;
  //   @ApiPropertyOptional({ description: 'User fullName' })
  @IsOptional()
  readonly fullName: string;

  //   @ApiPropertyOptional({ description: 'User email' })
  @IsOptional()
  @IsEmail()
  readonly email: string;

  //   @ApiPropertyOptional({ description: 'User phoneNumber' })
  @IsOptional()
  readonly phoneNumber: string;

  //   @ApiPropertyOptional({ description: 'User password' })
  // @IsOptional()
  //  password: string;

  //   @ApiPropertyOptional({ description: 'User photo' })
  @IsOptional()
  readonly photo: string;

  //   @ApiPropertyOptional({ description: 'User role' })
  @IsOptional()
  readonly role: string;
}
