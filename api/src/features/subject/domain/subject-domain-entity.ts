import { Logger } from 'winston';
import { SubjectDto, SexDto, SubjectStatusDto } from './dto';
import { ValidationError } from '@core/errors';

export const SEX_DTO_VALUES = new Set<SexDto>(['male', 'female']);

export const SUBJECT_STATUS_DTO_VALUES = new Set<SubjectStatusDto>(['in_progress', 'enrolled', 'failed']);

/**
 * Subject domain model which contains business logic.
 */
export class SubjectDomainEntity {
  constructor(
    private readonly dto: SubjectDto,
    private readonly logger: Logger
  ) {}

  /**
   * Validate dto. Throws validation error if validation fails.
   * @returns true if pitch diameter is greater than outside diameter.
   */
  validateDto(): boolean {
    if (!SUBJECT_STATUS_DTO_VALUES.has(this.dto.status)) {
      throw new ValidationError(`Invalid subject status: [${this.dto.status}].`);
    }

    if (!SEX_DTO_VALUES.has(this.dto.sex)) {
      throw new ValidationError(`Invalid sex: [${this.dto.sex}].`);
    }

    return true;
  }

  toDto(): SubjectDto {
    return this.dto;
  }
}
