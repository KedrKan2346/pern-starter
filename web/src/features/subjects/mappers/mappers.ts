import { DateTime } from 'luxon';
import { formatDateAsShort } from '@/shared/utils';
import { SubjectDto } from '../domain/dto';
import { SubjectFormData, SubjectViewModel } from '../viewmodels';

/**
 * Map subject DTO to subject view model.
 * @param subjectDto Subject DTO.
 * @returns Subject view model.
 */
export function mapSubjectDtoToViewModel(subjectDto: SubjectDto): SubjectViewModel {
  const { id, name, sex, status, diagnosisDate } = subjectDto;
  return {
    id,
    name,
    sex,
    status,
    diagnosisDate: formatDateAsShort(diagnosisDate),
  };
}

export function mapSubjectDtoToFormDataModel(subjectDto: SubjectDto): SubjectFormData {
  const { name, sex, status, diagnosisDate } = subjectDto;
  return {
    name,
    sex,
    status,
    diagnosisDate: DateTime.fromISO(diagnosisDate).setZone('America/New_York').toJSDate(),
  };
}
