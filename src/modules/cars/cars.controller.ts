import {
  Body,
  Controller,
  Res,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/common/auth/guard/role.guard';
import { CarDto } from 'src/modules/cars/dto/cars.dto';
import { CarsService } from './cars.service';
import { Roles } from 'src/common/auth/dto/decorator/roles.decorator';
import { Role } from 'src/common/auth/enum/enum';
import FindOneParam from '../../common/schemas/find-one-param';
import { UpdateCarDto } from '../../common/schemas/update-Car';
import { ChangeOwnerDto } from '../../common/schemas/update-car-owner';
import SearchParam from 'src/common/schemas/search';
import findAndCount from 'src/common/schemas/find-and-count';
import UpdateCarState from 'src/common/schemas/update-state';
import GetState from 'src/common/schemas/state';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiResponse,
  ApiResponseProperty,
  ApiTags,
} from '@nestjs/swagger';
import { response } from 'express';

@ApiTags('cars')
// @ApiHeader({
//   name: 'My Header',
//   description: 'A Custom Header',
// })
// @UseGuards(AuthGuard('jwtStrategy'), RoleGuard)
@Controller('cars')
export class CarsController {
  constructor(private readonly service: CarsService) {}

  @Roles(Role.ADMIN)
  // @ApiResponse(ApiAcceptedResponse({status:201}))
  @Delete('delete/many')
  deleteCarsByIds(@Body() payload: any) {
    return this.service.deleteCarsByIds(payload);
  }
  @Roles(Role.ADMIN)
  @Put('/updatestate')
  updateCarState(@Body() state: UpdateCarState) {
    return this.service.updateCarState(state);
  }

  // @Roles(Role.ADMIN)
  @Get('/countcondition')
  findReparedCarsAndCount(@Body() payload: any) {
    return this.service.findReparedCarsAndCount(payload.isRepared);
  }
  // @Roles(Role.ADMIN)
  @Get('/findcount')
  findAndCountCars(@Body() payload: findAndCount) {
    return this.service.findAndCountCars(payload);
  }
  @Roles(Role.ADMIN, Role.USER)
  @Post()
  addCar(@Body() body: CarDto) {
    return this.service.addCar(body);
  }

  // @Roles(Role.ADMIN)
  @ApiCreatedResponse({ description: 'works' })
  @ApiBadRequestResponse({ description: 'yyeeey' })
  @Get()
  async getAllCars(@Res({ passthrough: false }) response: any) {
    return await this.service.getAllCars();
  }


  // insert many
  // seeder => controller seed models 50 model
  // seeder create cars 150 random models
  // KPI center
  // nomber of models, number of cars, number of cars in every model, number of cars in every model repared / unrepared
  

  @Roles(Role.ADMIN)
  @Get('get/:id')
  getOneCar(@Param() id: FindOneParam) {
    return this.service.getOneCar(id);
  }

  @Roles(Role.ADMIN)
  @Put('update/:id')
  changeOwner(@Param() id: FindOneParam, @Body() body: ChangeOwnerDto) {
    return this.service.changeOwner(id, body);
  }

  @Roles(Role.ADMIN)
  @Delete('deleteOne/:id')
  deleteBrand(@Param() id: FindOneParam) {
    return this.service.deleteCar(id);
  }
  @Roles(Role.ADMIN)
  @Get('search')
  searchCar(@Body() req: SearchParam) {
    return this.service.searchCar(req);
  }
  @Roles(Role.ADMIN)
  @Get('find/many')
  findCarsByIds(@Body() payload: any) {
    return this.service.findCarsByIds(payload);
  }
  @Roles(Role.ADMIN)
  @Get('find/stats')
  getStats(@Body() state: GetState) {
    return this.service.getStats(state);
  }
  @Roles(Role.USER)
  @Get('user/:id')
  getAllOfTheUser(@Param() payload: FindOneParam) {
    return this.service.getAllOfTheUser(payload);
  }

  @Roles(Role.USER)
  @Get('user/:id')
  getOneCarOfTheUser(@Param() id: FindOneParam) {
    return this.service.getOneCarOfTheUser(id);
  }

  @Roles(Role.USER)
  @Put('user/:id')
  updateCarOfTheUser(
    @Param()
    id: FindOneParam,
    @Body() body: UpdateCarDto,
  ) {
    return this.service.updateCarOfTheUser(id, body);
  }

  @Roles(Role.USER)
  @Delete('user/:id')
  deleteCarOfTheUser(@Param() id: FindOneParam) {
    return this.service.deleteCarOfTheUser(id);
  }
  @Roles(Role.USER)
  @Delete('user/:id')
  reset() {
    return this.service.reset();
  }
}
