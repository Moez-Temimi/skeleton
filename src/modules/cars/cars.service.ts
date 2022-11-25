import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarDto } from 'src/modules/cars/dto/cars.dto';
import { Car } from 'src/common/models/cars.entity';
import { In, Repository } from 'typeorm';
import { User } from 'src/common/models/users.entity';
import FindOneParam from '../../common/schemas/find-one-param';
import { UpdateCarDto } from '../../common/schemas/update-Car';
import { ChangeOwnerDto } from '../../common/schemas/update-car-owner';
import FindManyParams from 'src/common/schemas/find-many-params';
import SearchParam from 'src/common/schemas/search';
import findAndCount from 'src/common/schemas/find-and-count';
import UpdateCarState from 'src/common/schemas/update-state';
import GetState from 'src/common/schemas/state';
import { FindAllCarsSelector } from 'src/common/schemas/selector';
import { FindRelation } from 'src/common/schemas/relations';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car) private readonly carRepo: Repository<Car>,
  ) {}

  public async addCar(body: CarDto) {
    return this.carRepo.save(new Car(body));
  }

  public async getAllCars() {
    const data = await this.carRepo.find({
      select: FindAllCarsSelector,
      relations: FindRelation,
    });
    return data;
  }
  public async getAllOfTheUser(ownerId: FindOneParam) {
    const data = await this.carRepo.find({
      where: {
        owner: { id: ownerId.id },
      },
      select: FindAllCarsSelector,
      relations: FindRelation,
    });
    return data;
  }

  public async getOneCar(state: FindOneParam) {
    const { id } = state;
    return await this.carRepo.findOne({
      where: { id: id },
      select: FindAllCarsSelector,
    });
  }

  public async changeOwner(id: FindOneParam, body: Partial<ChangeOwnerDto>) {
    return (await this.carRepo.update(id, body)).affected;
  }

  public async deleteCar(id: FindOneParam) {
    return await this.carRepo.delete(id);
  }

  public async getOneCarOfTheUser(id: FindOneParam) {
    return await this.carRepo.findOne({
      where: { id: id.id },
      select: FindAllCarsSelector,
    });
  }

  public async updateCarOfTheUser(
    id: FindOneParam,
    body: Partial<UpdateCarDto>,
  ) {
    return await this.carRepo.update(id, body);
  }

  public async deleteCarOfTheUser(id: FindOneParam) {
    return await this.carRepo.delete(id);
  }

  public async findCarsByIds(payload: any) {
    console.log(payload);
    return await this.carRepo.findBy({
      id: In(payload.id),
    });
  }
  public async deleteCarsByIds(payload: any) {
    console.log(payload);
    return await this.carRepo.delete(payload.id);
  }
  public async findReparedCarsAndCount(state: any) {
    return await this.carRepo.findAndCountBy({ isRepared: state });
  }
  async searchCar(args: SearchParam) {
    const { searchQuery, take, skip } = args;

    return await this.carRepo
      .createQueryBuilder('cars')
      .select()
      .where('cars.model ILIKE :searchQuery', {
        searchQuery: `%${searchQuery}%`,
      })
      .orWhere('cars.brandName ILIKE :searchQuery', {
        searchQuery: `%${searchQuery}%`,
      })
      .orWhere('cars.serialNum ILIKE :searchQuery', {
        searchQuery: `%${searchQuery}%`,
      })
      .skip(skip)
      .take(take)
      .getMany();
  }

  public async findAndCountCars(args: findAndCount) {
    const { skip, take } = args;
    return await this.carRepo
      .createQueryBuilder('cars')
      .select()
      .skip(skip)
      .take(take)
      .getMany();
  }
  public async updateCarState(state: UpdateCarState) {
    const { id, isRepared } = state;
    let result = (await this.carRepo.update(id, { isRepared })).affected;
    return result;
  }
  public async getStats(state: GetState) {
    const { isRepared } = state;
    return await this.carRepo
      .createQueryBuilder('cars')
      .where('cars.isRepared =:state', { state: isRepared })
      .getCount();
  }
  public async reset() {
    return this.carRepo.clear();
  }
}
