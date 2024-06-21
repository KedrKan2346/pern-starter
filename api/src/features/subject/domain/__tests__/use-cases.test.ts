import { DateTime } from 'luxon';
import { ValidationError } from '@core/errors';
import { createLogger } from 'winston';
import { mock } from 'jest-mock-extended';
import { TypeOrmSubjectPersistenceService } from '../../infrastructure';
import { SubjectUseCases } from '../use-cases';
import { SubjectDto } from '../dto';

interface SubjectResponse {
  entities: SubjectDto[];
  total: number;
}

const subjectsResponse: SubjectResponse = {
  entities: [
    {
      id: '66a2e56d-6311-4fa3-b088-c33a5d69fc69',
      name: 'Some Name',
      sex: 'female',
      status: 'in_progress',
      diagnosisDate: DateTime.fromISO('2024-06-07T04:00:00.000Z').toJSDate(),
    },
  ],
  total: 1,
};

const defaultSubjectDto: SubjectDto = {
  id: '66a2e56d-6311-4fa3-b088-c33a5d69fc69',
  name: 'Some Name',
  sex: 'female',
  status: 'in_progress',
  diagnosisDate: DateTime.fromISO('2024-06-07T04:00:00.000Z').toJSDate(),
};

const mockLogger = createLogger();

const mockPersistence = mock<TypeOrmSubjectPersistenceService>({
  getAllPaged: jest.fn(async () => subjectsResponse),
  create: jest.fn(async () => {
    return { id: '66a2e56d-6311-4fa3-b088-c33a5d69fc69' };
  }),
  findById: jest.fn(async () => subjectsResponse.entities[0]),
  updateById: jest.fn(async () => 1),
  deleteById: jest.fn(async () => 1),
});

beforeEach(() => {
  mockPersistence.getAllPaged.mockClear();
  mockPersistence.create.mockClear();
  mockPersistence.findById.mockClear();
  mockPersistence.updateById.mockClear();
  mockPersistence.deleteById.mockClear();
});

// NOTE: The best practice is having tests free of implementation details so DTO fields
// which come from persistence will not be explored. Only non mocked domain model interactions
// are important.

describe('Subject use case should', () => {
  it('persist new subject if domain model is valid', async () => {
    const useCases = new SubjectUseCases(mockPersistence, mockLogger);
    const newSubject = await useCases.create(defaultSubjectDto);
    expect(newSubject).toEqual({ id: '66a2e56d-6311-4fa3-b088-c33a5d69fc69' });
    expect(mockPersistence.create).toHaveBeenCalledTimes(1);
    expect(mockPersistence.create).toHaveBeenCalledWith(defaultSubjectDto);
  });

  it('throw validation error when creating new subject and domain model is not valid', async () => {
    const useCases = new SubjectUseCases(mockPersistence, mockLogger);
    const subjectDto = { ...defaultSubjectDto, status: 'other' };
    try {
      await useCases.create(subjectDto as SubjectDto);
    } catch (e) {
      expect(e).toBeInstanceOf(ValidationError);
    }
    expect(mockPersistence.create).toHaveBeenCalledTimes(0);
  });

  it('return paged subjects', async () => {
    const useCases = new SubjectUseCases(mockPersistence, mockLogger);
    const subjects = await useCases.getAllPaged(10, 1, 'name', 'desc');
    expect(mockPersistence.getAllPaged).toHaveBeenCalledTimes(1);
    expect(mockPersistence.getAllPaged).toHaveBeenCalledWith(10, 1, 'name', 'desc');
    expect(subjects).toEqual(subjectsResponse);
  });

  it('update subject by id', async () => {
    const useCases = new SubjectUseCases(mockPersistence, mockLogger);
    const subjectDto: SubjectDto = { ...defaultSubjectDto, sex: 'male', status: 'enrolled' };
    const result = await useCases.updateById('66a2e56d-6311-4fa3-b088-c33a5d69fc69', subjectDto);
    expect(mockPersistence.updateById).toHaveBeenCalledTimes(1);
    expect(mockPersistence.updateById).toHaveBeenCalledWith(
      '66a2e56d-6311-4fa3-b088-c33a5d69fc69',
      subjectDto
    );
    expect(result).toBe(1);
  });

  it('return subject by id', async () => {
    const useCases = new SubjectUseCases(mockPersistence, mockLogger);
    const subject = await useCases.findById('66a2e56d-6311-4fa3-b088-c33a5d69fc69');
    expect(mockPersistence.findById).toHaveBeenCalledTimes(1);
    expect(mockPersistence.findById).toHaveBeenCalledWith('66a2e56d-6311-4fa3-b088-c33a5d69fc69');
    expect(subject).toEqual(subjectsResponse.entities[0]);
  });

  it('delete subject by id', async () => {
    const useCases = new SubjectUseCases(mockPersistence, mockLogger);
    const result = await useCases.deleteById('66a2e56d-6311-4fa3-b088-c33a5d69fc69');
    expect(mockPersistence.deleteById).toHaveBeenCalledTimes(1);
    expect(mockPersistence.deleteById).toHaveBeenCalledWith('66a2e56d-6311-4fa3-b088-c33a5d69fc69');
    expect(result).toBe(1);
  });
});
