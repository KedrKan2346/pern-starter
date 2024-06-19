import { RequestHandler } from 'express';
import { Logger } from 'winston';
import { NotFoundError } from '@core/errors';
import { formatResultResponse } from '@core/format-response';
import { getPageQueryParams } from '@features/shared/presentation/controllers';
import { SubjectUseCases } from '../domain/use-cases';

// NOTE: Using arrow functions for context binding simplicity.

/**
 * Controllers receive HTTP requests, execute use cases, format and send back responses.
 */
export class SubjectController {
  constructor(
    private readonly useCases: SubjectUseCases,
    private readonly logger: Logger
  ) {}

  /**
   * Get paginated subjects.
   * @param req HTTP request.
   * @param res HTTP response.
   */
  getAllPaged: RequestHandler = async (req, res) => {
    const { take, skip } = getPageQueryParams(req);

    const subjects = await this.useCases.getAllPaged(take, skip);

    res.send(
      formatResultResponse(subjects, 'subjects', 'query', {
        details: { take, skip, count: subjects.length },
      })
    );
  };

  /**
   * Create new subject.
   * @param req HTTP request.
   * @param res HTTP response.
   */
  create: RequestHandler = async (req, res) => {
    const createdSubject = await this.useCases.create(req.body);
    res.send(formatResultResponse(createdSubject, 'subject', 'mutation', { details: {} }));
  };

  /**
   * Get subject by id.
   * @param req HTTP request.
   * @param res HTTP response.
   */
  findById: RequestHandler = async (req, res) => {
    const id = req.params['id'];
    const subject = await this.useCases.findById(id);

    if (!subject) {
      throw new NotFoundError('Resource not found.');
    }

    res.send(formatResultResponse(subject, 'subject', 'query', { details: {} }));
  };

  /**
   * Update subject by id.
   * @param req HTTP request.
   * @param res HTTP response.
   */
  updateById: RequestHandler = async (req, res) => {
    const id = req.params['id'];
    const recordsAffected = await this.useCases.updateById(id, req.body);

    if (!recordsAffected) {
      throw new NotFoundError('Resource not found.');
    }

    res.send(formatResultResponse(null, 'subject', 'mutation', { details: { recordsAffected } }));
  };
}