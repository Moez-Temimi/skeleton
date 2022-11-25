import { IsNotEmpty } from 'class-validator';

export default class SearchParam {
  @IsNotEmpty()
  searchQuery: string | boolean | number;
  @IsNotEmpty()
  take: number;
  @IsNotEmpty()
  skip: number;
}
