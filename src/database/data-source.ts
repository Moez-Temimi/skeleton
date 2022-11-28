import { config } from 'src/config/orm.config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';

(async () => {
  const options: DataSourceOptions & SeederOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'onboarding',
    entities: [__dirname + './../common/models/*.entity{.ts,.js}'],
    logging: true,
    synchronize: true,
    seeds: ['./src/database/seeds/**/*.seed.ts'],
    factories: ['./src/database/factories/**/*.factory.ts'],
  };
  const dataSource = new DataSource(options);
  await dataSource.initialize();
  await runSeeders(dataSource);
})();
