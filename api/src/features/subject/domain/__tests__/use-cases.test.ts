import { ValidationError } from '@core/errors';
import { createLogger } from 'winston';
import { mock } from 'jest-mock-extended';
import { TypeOrmSubjectPersistenceService } from '../../infrastructure';
import { SubjectUseCases } from '../use-cases';

const subjectsResponse = [
  {
    id: '66a2e56d-6311-4fa3-b088-c33a5d69fc69',
    factoryId: '1cfaaac5-64fb-428c-9e29-2580d0815397',
    teeth: 51,
    pitchDiameter: 151,
    outsideDiameter: 170,
    pitch: 140,
  },
];

const defaultSubjectDto = {
  factoryId: '1cfaaac5-64fb-428c-9e29-2580d0815397',
  teeth: 51,
  pitchDiameter: 151,
  outsideDiameter: 170,
  pitch: 111,
};

const mockLogger = createLogger();

const mockPersistence = mock<TypeOrmSubjectPersistenceService>({
  getAllPaged: jest.fn(async () => subjectsResponse),
  create: jest.fn(async () => {
    return { id: '66a2e56d-6311-4fa3-b088-c33a5d69fc69' };
  }),
  findById: jest.fn(async () => subjectsResponse[0]),
  updateById: jest.fn(async () => 1),
});

beforeEach(() => {
  mockPersistence.getAllPaged.mockClear();
  mockPersistence.create.mockClear();
  mockPersistence.findById.mockClear();
  mockPersistence.updateById.mockClear();
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

  it('throw validation error if domain model is not valid', async () => {
    const useCases = new SubjectUseCases(mockPersistence, mockLogger);
    const subjectDto = { ...defaultSubjectDto, outsideDiameter: 17 };
    try {
      await useCases.create(subjectDto);
    } catch (e) {
      expect(e).toBeInstanceOf(ValidationError);
    }
    expect(mockPersistence.create).toHaveBeenCalledTimes(0);
  });

  it('return paged subjects', async () => {
    const useCases = new SubjectUseCases(mockPersistence, mockLogger);
    const subjects = await useCases.getAllPaged(10, 1);
    expect(mockPersistence.getAllPaged).toHaveBeenCalledTimes(1);
    expect(mockPersistence.getAllPaged).toHaveBeenCalledWith(10, 1);
    expect(subjects).toEqual(subjectsResponse);
  });

  it('update subject by id', async () => {
    const useCases = new SubjectUseCases(mockPersistence, mockLogger);
    const subjectDto = { ...defaultSubjectDto, teeth: 1, pitch: 1 };
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
    expect(subject).toEqual(subjectsResponse[0]);
  });
});
