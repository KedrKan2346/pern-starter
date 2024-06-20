import { formatDateAsShort } from '@/shared/utils';
import { SubjectDto } from '../domain/dto';
import { SubjectViewModel } from '../viewmodels';

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
