import { useQuery } from 'react-query';
import { getServiceConfiguration } from '@config';
import { SubjectDto } from '../domain/dto';
import { SubjectViewModel } from '../viewmodels';
import { mapSubjectDtoToViewModel } from '../mappers/mappers';

interface UseSubjectsParams {
  take?: number;
  skip?: number;
}

interface UseSubjects {
  entities: SubjectViewModel[];
  error: unknown;
  isLoading: boolean;
}

interface QueryResult {
  result?: {
    query?: {
      subjects?: SubjectDto[];
    };
  };
}

export function useSubjects({ take, skip }: UseSubjectsParams): UseSubjects {
  const { webApiUrl } = getServiceConfiguration();

  async function getSubjects() {
    const res = await fetch(`${webApiUrl}/subjects?take=${take}&skip=${skip}`);
    return res.json();
  }

  const { data, error, isLoading } = useQuery<QueryResult>('subjects', getSubjects);
  const queryResult = data?.result?.query ?? {};
  const entities = queryResult.subjects ?? [];

  return {
    entities: entities.map(mapSubjectDtoToViewModel),
    error,
    isLoading,
  };
}
