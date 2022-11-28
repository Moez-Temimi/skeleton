import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
// import FindOneParam from '../schemas/find-one-param';

export class UpdateCarDto {
  @ApiProperty({ type: 'string' })
  @IsOptional()
  model: string;

  @ApiProperty({ type: 'string' })
  @IsOptional()
  serialNum: string;
}
