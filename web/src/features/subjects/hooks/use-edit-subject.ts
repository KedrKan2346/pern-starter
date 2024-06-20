import { useState } from 'react';
import { useQuery } from 'react-query';
import { getServiceConfiguration } from '@/shared/config';
import { SubjectDto } from '../domain/dto';

interface UseEditSubjectProps {
  entityId?: string;
}

interface QueryResultSuccess {
  result?: {
    query?: {
      subject?: SubjectDto;
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

export function useEditSubject({ entityId }: UseEditSubjectProps) {
  const { webApiUrl } = getServiceConfiguration();
  const [serverErrors, setServerErrors] = useState<string[]>([]);
  const [entity, setEntity] = useState<SubjectDto | undefined>(undefined);

  async function getSubjectById() {
    const res = await fetch(`${webApiUrl}/subjects/${entityId}`);
    return res.json();
  }

  const { isLoading } = useQuery<QueryResultSuccess | QueryResultError>(
    `subject-${entityId}`,
    getSubjectById,
    {
      onError: (/* error */) => {
        setServerErrors(['Unexpected error occurred']);
      },
      onSuccess: async (response) => {
        if (isQueryResultSuccess(response)) {
          const queryResultSuccess = response?.result?.query ?? {};
          setEntity(queryResultSuccess.subject ?? undefined);
        } else if (isQueryResultError(response)) {
          setServerErrors(response?.error?.messages ?? []);
        } else {
          setServerErrors(['Unexpected server response']);
        }
      },
    }
  );

  return {
    entity,
    serverErrors,
    isLoading,
  };
}
