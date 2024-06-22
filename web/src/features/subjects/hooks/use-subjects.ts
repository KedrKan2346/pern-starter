import { useState } from 'react';
import { useQuery } from 'react-query';
import { getServiceConfiguration } from '@config';
import { SubjectDto } from '../domain/dto';
import { SubjectViewModel } from '../viewmodels';
import { mapSubjectDtoToViewModel } from '../mappers/mappers';

interface UseSubjectsProps {
  take: number;
  skip: number;
  sortByColumn: string | null;
  sortDirection: string | null;
  nameLookupText: string | undefined;
  sexFilterValues: string[];
  statusFilterValues: string[];
}

interface UseSubjects {
  entities: SubjectViewModel[];
  serverErrors: string[];
  isLoading: boolean;
  numberOfPages: number;
}

interface QueryResultSuccess {
  result?: {
    query?: {
      details?: { total: number };
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

export function useSubjects({
  take,
  skip,
  sortByColumn,
  sortDirection,
  nameLookupText,
  sexFilterValues,
  statusFilterValues,
}: UseSubjectsProps): UseSubjects {
  const { webApiUrl } = getServiceConfiguration();
  const [serverErrors, setServerErrors] = useState<string[]>([]);
  const [entities, setEntities] = useState<SubjectViewModel[]>([]);
  const [numberOfPages, setNumberOfPages] = useState<number>(0);

  const apiUrlWithQueryParams = new URL(`${webApiUrl}/subjects`);
  apiUrlWithQueryParams.searchParams.set('take', take.toString());
  apiUrlWithQueryParams.searchParams.set('skip', skip.toString());
  if (sortByColumn) {
    apiUrlWithQueryParams.searchParams.set('sortby', sortByColumn);
  }
  if (sortDirection) {
    apiUrlWithQueryParams.searchParams.set('sortorder', sortDirection);
  }
  if (nameLookupText) {
    apiUrlWithQueryParams.searchParams.set('name', nameLookupText);
  }
  if (sexFilterValues.length > 0) {
    apiUrlWithQueryParams.searchParams.set('sex', sexFilterValues.join(','));
  }
  if (statusFilterValues.length > 0) {
    apiUrlWithQueryParams.searchParams.set('status', statusFilterValues.join(','));
  }

  async function getSubjects() {
    const res = await fetch(apiUrlWithQueryParams.toString());
    return res.json();
  }

  const queryKey = apiUrlWithQueryParams.searchParams.toString();

  const { isLoading } = useQuery<QueryResultSuccess | QueryResultError>(`subject-${queryKey}`, getSubjects, {
    onError: (/* error */) => {
      setServerErrors(['Unexpected error occurred']);
    },
    onSuccess: async (response) => {
      if (isQueryResultSuccess(response)) {
        const queryResultSuccess = response?.result?.query ?? {};
        const subjects = queryResultSuccess?.subjects ?? [];
        setEntities(subjects.map(mapSubjectDtoToViewModel));
        const total = queryResultSuccess?.details?.total ?? 0;
        setNumberOfPages(Math.ceil(total / take));
      } else if (isQueryResultError(response)) {
        setServerErrors(response?.error?.messages ?? []);
      } else {
        setServerErrors(['Unexpected server response']);
      }
    },
    cacheTime: 0,
  });

  return {
    entities,
    serverErrors,
    isLoading,
    numberOfPages,
  };
}
