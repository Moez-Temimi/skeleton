import { ApiProperty } from '@nestjs/swagger';
import { IsDate, isNotEmpty, IsNotEmpty, IsUUID } from 'class-validator';
import { UserDto } from 'src/modules/users/dto/users.dto';
// import FindOneParam from '../schemas/find-one-param';

export class CarDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  model: string;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  brandName: string;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  serialNum: string;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  owner: UserDto;
}
