import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: 5432,
  username: process.env.DB_AUTH_USERNAME || 'yourusername',
  password: process.env.DB_AUTH_PASSWORD || 'yourpassword',
  database: process.env.DB_NAME || 'yourdatabase',
  synchronize: false,
  entities: [__dirname + '../apps/backend/main.js'],
  migrations: [__dirname + '/migrations/*.js'],
  logging: true,
});

export default AppDataSource;
