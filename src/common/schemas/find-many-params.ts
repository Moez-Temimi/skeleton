import { IsArray, IsNotEmpty, IsUUID, UUIDVersion } from 'class-validator';
import FindOneParam from './find-one-param';

export default class FindManyParams {
  @IsArray()
  readonly ids: [FindOneParam];
}
