import { useState } from 'react';
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
  serverErrors: string[];
  isLoading: boolean;
}

interface QueryResultSuccess {
  result?: {
    query?: {
      subjects?: SubjectDto[];
    };
  };
}

interface QueryResultError {
  error?: {
    messages?: string[];
  };
}

function isQueryResultSuccess(value: QueryResultSuccess | QueryResultError): value is QueryResultSuccess {
  return 'result' in value;
}

function isQueryResultError(value: QueryResultSuccess | QueryResultError): value is QueryResultError {
  return 'error' in value;
}

export function useSubjects({ take, skip }: UseSubjectsParams): UseSubjects {
  const { webApiUrl } = getServiceConfiguration();
  const [serverErrors, setServerErrors] = useState<string[]>([]);
  const [entities, setEntities] = useState<SubjectViewModel[]>([]);

  async function getSubjects() {
    const res = await fetch(`${webApiUrl}/subjects?take=${take}&skip=${skip}`);
    return res.json();
  }

  const { isLoading } = useQuery<QueryResultSuccess | QueryResultError>('subjects', getSubjects, {
    onError: (/* error */) => {
      setServerErrors(['Unexpected error occurred']);
    },
    onSuccess: async (response) => {
      if (isQueryResultSuccess(response)) {
        const queryResultSuccess = response?.result?.query ?? {};
        const subjects = queryResultSuccess?.subjects ?? [];
        setEntities(subjects.map(mapSubjectDtoToViewModel));
      } else if (isQueryResultError(response)) {
        setServerErrors(response?.error?.messages ?? []);
      } else {
        setServerErrors(['Unexpected server response']);
      }
    },
  });

  return {
    entities,
    serverErrors,
    isLoading,
  };
}
