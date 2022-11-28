import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './users.entity';
import { CarDto } from 'src/modules/cars/dto/cars.dto';
import { Car } from './cars.entity';
import { ApiProperty } from '@nestjs/swagger';
// import FindOneParam from 'src/modules/cars/schemas/find-one-param';

@Entity('brands')
export class Brand {
  //   constructor(entity: CarDto) {
  //     Object.assign(this, entity);
  //   }
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @ApiProperty()
  @OneToMany(() => Car, (cars) => cars.brand)
  cars: Car[];
}
