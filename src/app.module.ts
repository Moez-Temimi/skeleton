import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config/orm.config';
import { CarsModule } from './modules/cars/cars.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './common/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { BrandsModule } from './modules/brands/brands.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(config),
    UsersModule,
    CarsModule,
    AuthModule,
    BrandsModule,
  ],
})
export class AppModule {}
