import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/auth/dto/decorator/roles.decorator';
import { Role } from 'src/common/auth/enum/enum';
import { RoleGuard } from 'src/common/auth/guard/role.guard';
import { BrandsService } from './brands.service';

@ApiTags('brands')
@UseGuards(AuthGuard('jwtStrategy'), RoleGuard)
@Controller('brands')
export class BrandsController {
  constructor(private readonly service: BrandsService) {}

  // @Roles(Role.ADMIN)
  @Get('find')
  getStats() {
    return this.service.getStats();
  }
  @Roles(Role.ADMIN)
  @Post('insertbrands')
  insertManyBrands() {
    return this.service.insertManyBrands();
  }
  @Roles(Role.ADMIN)
  @Get('findcarsbybrand/stats')
  getNbrOfCarsWithBrandAndState() {
    return this.service.getNbrOfCarsWithBrandAndState();
  }
}
