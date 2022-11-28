import { IsNotEmpty } from 'class-validator';

export default class InsertManyCars {
  @IsNotEmpty()
  model: string;
  @IsNotEmpty()
  serialNum: string;
  @IsNotEmpty()
  ownerId: string;
  @IsNotEmpty()
  brandId: string;
}
