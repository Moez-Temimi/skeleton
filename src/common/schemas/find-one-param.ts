import { IsNotEmpty, IsUUID } from 'class-validator';

export default class FindOneParam {
  @IsUUID()
  @IsNotEmpty()
  readonly id: string;
}
