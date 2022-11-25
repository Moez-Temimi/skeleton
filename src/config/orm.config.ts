import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'onboarding',
  entities: [__dirname + './../common/models/*.entity{.ts,.js}'],
  logging: true,
  synchronize: true,
};
