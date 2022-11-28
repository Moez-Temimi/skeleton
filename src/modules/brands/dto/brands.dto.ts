import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Car } from 'src/common/models/cars.entity';

export class BrandDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  cars: Car;

  
}
