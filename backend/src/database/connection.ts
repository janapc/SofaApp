import { createConnection } from 'typeorm';
import User from '../entity/User';

export let connection = createConnection({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'banana',
  database: 'oncouch',
  entities: [User],
  synchronize: true,
  logging: false,
});

export default connection;
