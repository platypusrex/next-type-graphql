import { ConnectionOptions } from 'typeorm';
import { User } from '../entities/User';

export const typeormOptions: ConnectionOptions = {
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'next_typescript_db_admin',
  password: 'password',
  database: 'next_typescript_db',
  synchronize: true,
  logging: true,
  entities: [User],
};
