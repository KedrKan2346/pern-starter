import { ValidationError } from '@core/errors';
import { DateTime } from 'luxon';
import { SubjectDomainEntity } from '../subject-domain-entity';
import { createLogger } from 'winston';
import { SubjectDto } from '../dto';

const defaultSubjectDto: SubjectDto = {
  name: 'Some Name',
  sex: 'female',
  status: 'in_progress',
  diagnosisDate: DateTime.fromISO('2024-06-07T04:00:00.000Z').toJSDate(),
};

const mockLogger = createLogger();

describe('Subject domain entity should', () => {
  it('pass validation if all fields have appropriate values', () => {
    const subjectDomain = new SubjectDomainEntity(defaultSubjectDto, mockLogger);
    expect(subjectDomain.validateDto()).toEqual(true);
  });

  it('throw error if "sex" field contains inappropriate value', () => {
    const subjectDto = { ...defaultSubjectDto, sex: 'other' };
    const subjectDomain = new SubjectDomainEntity(subjectDto as SubjectDto, mockLogger);
    expect(() => {
      subjectDomain.validateDto();
    }).toThrow(ValidationError);
  });

  it('throw error if "status" field contains inappropriate value', () => {
    const subjectDto = { ...defaultSubjectDto, status: 'other' };
    const subjectDomain = new SubjectDomainEntity(subjectDto as SubjectDto, mockLogger);
    expect(() => {
      subjectDomain.validateDto();
    }).toThrow(ValidationError);
  });

  it('return internal state as DTO', () => {
    const subjectDomain = new SubjectDomainEntity(defaultSubjectDto, mockLogger);
    expect(subjectDomain.toDto()).toEqual(defaultSubjectDto);
  });
});
