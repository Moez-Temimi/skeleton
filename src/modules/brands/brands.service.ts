import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { brands } from 'brands.json ';
import { groupBy } from 'rxjs';
import { Brand } from 'src/common/models/brands.entity';
import { Car } from 'src/common/models/cars.entity';
import { Repository } from 'typeorm';
import { CarsController } from '../cars/cars.controller';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand) private readonly brandRepo: Repository<Brand>,
  ) {}

  public async getStats() {
    return await this.brandRepo.findAndCount();
  }
  public async insertManyBrands() {
    return await this.brandRepo.insert(brands);
    //   return await this.brandRepo.save(newBrands)
  }
  public async getNbrOfCarsWithBrandAndState() {
    return await this.brandRepo
      .createQueryBuilder('brands')
      // .innerJoinAndSelect((subQuery) => {
      //   return subQuery
      //     .from('brands.cars', 'cars')
      //     .select('COUNT(cars.model)', 'reparedCars')
      //     .where('cars.isRepared = true')

      //     .limit(1);
      // }, 'reparedCars')
      .addSelect((subQuery) => {
        return subQuery
          .select('COUNT(cars.model)', 'reparedCars')
          .where('cars.isRepared = true')
          .from(Car, 'cars')
          .limit(1);
      })
      .addSelect((subQuery) => {
        return subQuery
          .from(Car, 'cars')
          .where('cars.isRepared = false')
          .select('COUNT(cars.model)', 'unreparedCars')
          .limit(1);
      })
      .addSelect((subQuery) => {
        return subQuery
          .from(Car, 'cars')
          .select('COUNT(cars.model)', 'allCars')
          .limit(1);
      })
      .groupBy('brands.name, brands.id')
      .getRawMany();
  }
}
