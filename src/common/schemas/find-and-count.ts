import { IsNotEmpty } from 'class-validator';

export default class findAndCount {
  @IsNotEmpty()
  take: number;
  @IsNotEmpty()
  skip: number;
}
