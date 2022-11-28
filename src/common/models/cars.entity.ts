import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './users.entity';
import { CarDto } from 'src/modules/cars/dto/cars.dto';
import { Brand } from './brands.entity';
import { ApiProperty } from '@nestjs/swagger';
// import FindOneParam from 'src/modules/cars/schemas/find-one-param';

@Entity('cars')
export class Car {
  // constructor(entity: CarDto) {
  //   Object.assign(this, entity);
  // }
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 50 })
  model: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  serialNum: string;

  @ApiProperty()
  @Column({ default: false })
  isRepared: boolean;

  @ApiProperty()
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  owner: User;

  @ApiProperty()
  @ManyToOne(() => Brand, { onDelete: 'CASCADE' })
  brand: Brand;
}
