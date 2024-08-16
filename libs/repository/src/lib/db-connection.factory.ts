import { Logger } from '@nestjs/common';
import { Db, MongoClient } from 'mongodb';
import { ConfigType } from '@nestjs/config';
import { dbConfig } from '@cherrypicker/config-be';

export async function createDbConnection(
  databaseConfig: ConfigType<typeof dbConfig>
): Promise<Db> {
  const logger = new Logger(createDbConnection.name);
  logger.log(databaseConfig);
  try {
    logger.log('Connecting to DB...');
    const mongoClient = new MongoClient(databaseConfig.DB_URL);
    const connection = await mongoClient.connect();
    logger.log('connected to DB');
    return connection.db(databaseConfig.DB_NAME);
  } catch (err) {
    logger.error('Error in connecting to DB');
    logger.error(err);
    throw err;
  }
}