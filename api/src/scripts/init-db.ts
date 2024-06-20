import { getServiceConfiguration } from '@core/config';
import { createPgPool } from '@core/postgres-client';
import { createLogger } from '@core/logger';
import { createDbSchema } from './create-db-schema';

const logger = createLogger('scripts');

/**
 * Create DB schema.
 */

(async () => {
  try {
    const config = getServiceConfiguration();
    const pgPool = createPgPool(config);
    await createDbSchema(pgPool, logger);
  } catch (e) {
    logger.error('DB initialization failed with error: ', e);
  }
})();
