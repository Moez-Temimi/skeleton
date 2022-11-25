import { IsNotEmpty, IsUUID } from 'class-validator';
import { UserDto } from 'src/modules/users/dto/users.dto';

export class ChangeOwnerDto {
  @IsNotEmpty()
  @IsUUID()
  owner: UserDto;
}
