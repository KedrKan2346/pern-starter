import { Pool } from 'pg';
import { Logger } from 'winston';

/**
 * This script creates database schema.
 */

async function createSubjectsTable(pgPool: Pool, logger: Logger): Promise<void> {
  const tableName = 'subjects';
  logger.info('Connecting to database...');
  let poolClient = null;

  try {
    const poolClient = await pgPool.connect();

    logger.info(`Creating ${tableName} table...`);

    await poolClient.query(`
          CREATE TABLE IF NOT EXISTS ${tableName} (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            name varchar(255) NOT NULL,
            sex varchar(6) NULL,
            status varchar(50) NOT NULL,
            diagnosis_date timestamp NOT NULL,
            created_at timestamp NOT NULL DEFAULT NOW(),
            updated_at timestamp NOT NULL DEFAULT NOW(),
            PRIMARY KEY (id)
          );
          CREATE INDEX IF NOT EXISTS idx_${tableName}_id ON ${tableName} (id);
          CREATE INDEX IF NOT EXISTS idx_${tableName}_name ON ${tableName} (name);
          CREATE INDEX IF NOT EXISTS idx_${tableName}_sex ON ${tableName} (sex);
          CREATE INDEX IF NOT EXISTS idx_${tableName}_status ON ${tableName} (status);
          CREATE INDEX IF NOT EXISTS idx_${tableName}_diagnosis_date ON ${tableName} (diagnosis_date);`);
    logger.info(`${tableName} table created`);
  } catch (error) {
    logger.error(`Failed to create ${tableName} table: ${error}`);
    console.log(JSON.stringify(error));
  } finally {
    logger.info('Releasing database client...');
    try {
      if (poolClient) {
        poolClient.release();
      }
      logger.info('Database client released');
    } catch (error) {
      logger.error('Unable to release database client: ' + error);
    }
  }
}

export async function createDbSchema(pgPool: Pool, logger: Logger) {
  await createSubjectsTable(pgPool, logger);
}
