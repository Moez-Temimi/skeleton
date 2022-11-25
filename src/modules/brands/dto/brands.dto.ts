import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UserDto } from 'src/modules/users/dto/users.dto';

export class CarDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  cars: CarDto;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  owner: UserDto;
}
