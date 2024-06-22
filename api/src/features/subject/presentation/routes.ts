import { Router } from 'express';
import { Logger } from 'winston';
import { DataSource } from 'typeorm';
import { SubjectController } from './controllers';
import { SubjectUseCases } from '../domain/use-cases';
import { TypeOrmSubjectPersistenceService } from '../infrastructure';
import { subjectCreateOrUpdateDtoSchema, subjectsFilterQueryParamsSchema } from './validators';
import {
  createPathParamsValidator,
  createQueryParamsValidator,
  createRequestBodyValidator,
  pagingQueryParamsSchema,
  createParamIdPathSchema,
} from '@features/shared/presentation/validators';

/**
 * Routes are main entry point of a feature (business entity) where all classes are initialized.
 */

/**
 * Initialize HTTP endpoint paths, persistence, and controllers.
 * @param dataSource Initialized and connected to database TypeORM data source.
 * @param logger Service logger.
 * @returns undefined.
 */
export function initSubjectRouters(dataSource: DataSource, logger: Logger) {
  const subjectMainRouter = Router();
  const subjectRouters = Router();
  const subjectPersistenceService = new TypeOrmSubjectPersistenceService(dataSource, logger);
  const subjectUseCases = new SubjectUseCases(subjectPersistenceService, logger);
  const subjectController = new SubjectController(subjectUseCases, logger);

  subjectRouters.get(
    '/',
    createQueryParamsValidator(pagingQueryParamsSchema),
    createQueryParamsValidator(subjectsFilterQueryParamsSchema),
    subjectController.getAllPaged
  );

  subjectRouters.get(
    '/:id',
    createPathParamsValidator(createParamIdPathSchema('id')),
    subjectController.findById
  );

  subjectRouters.post(
    '/',
    createRequestBodyValidator(subjectCreateOrUpdateDtoSchema),
    subjectController.create
  );

  subjectRouters.put(
    '/:id',
    createPathParamsValidator(createParamIdPathSchema('id')),
    createRequestBodyValidator(subjectCreateOrUpdateDtoSchema),
    subjectController.updateById
  );

  subjectRouters.delete(
    '/:id',
    createPathParamsValidator(createParamIdPathSchema('id')),
    subjectController.deleteById
  );

  subjectMainRouter.use('/subjects', subjectRouters);

  return subjectMainRouter;
}
