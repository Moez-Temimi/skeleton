import { IsNotEmpty } from 'class-validator';

export default class GetState {
  @IsNotEmpty()
  isRepared: boolean;
}
