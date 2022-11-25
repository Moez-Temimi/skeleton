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
// import FindOneParam from 'src/modules/cars/schemas/find-one-param';

@Entity('cars')
export class Car {
  constructor(entity: CarDto) {
    Object.assign(this, entity);
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  model: string;

  @Column({ type: 'varchar' })
  serialNum: string;

  @Column({ default: false })
  isRepared: boolean;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  owner: User;
  
  @ManyToOne(() => Brand, { onDelete: 'CASCADE' })
  brand: Brand;
}
