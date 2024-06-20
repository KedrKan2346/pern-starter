import { useState } from 'react';

const NUMBER_OF_RECORDS_PER_PAGE = 10;

interface UseSubjectsPaging {
  take: number;
  skip: number;
  handlePageChange: (pageNumber: number) => void;
}

export function useSubjectsPaging(): UseSubjectsPaging {
  const [skip, setSkip] = useState(0);

  function handlePageChange(pageNumber: number) {
    setSkip(NUMBER_OF_RECORDS_PER_PAGE * (pageNumber - 1));
  }

  return {
    take: NUMBER_OF_RECORDS_PER_PAGE,
    skip,
    handlePageChange,
  };
}
