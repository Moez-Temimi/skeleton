import { IsNotEmpty, IsUUID } from 'class-validator';

export default class UpdateCarState {
  @IsUUID()
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  isRepared: boolean;
}
