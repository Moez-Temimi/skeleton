import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/modules/users/dto/users.dto';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Car } from './cars.entity';

@Entity('users')
export class User {
  // constructor(entity: UserDto) {
  //   Object.assign(this, entity);
  // }
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 50 })
  fullName: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 50 })
  email: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  phoneNumber: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 80 })
  password: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 50 })
  role: string;

  @ApiProperty()
  @OneToMany(() => Car, (cars) => cars.owner)
  cars: Car[];
}
