import { IsArray, IsNotEmpty, IsUUID, UUIDVersion } from 'class-validator';

export default class FindManyParams {
  @IsArray()
  readonly ids: [string];
}
