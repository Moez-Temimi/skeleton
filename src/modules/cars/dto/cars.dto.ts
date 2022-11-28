import { ApiProperty } from '@nestjs/swagger';
import {  IsNotEmpty, IsUUID } from 'class-validator';
import { Brand } from 'src/common/models/brands.entity';
import { User } from 'src/common/models/users.entity';


export class CarDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  model: string;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  serialNum: string;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  owner: User;
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  brand: Brand;
}
