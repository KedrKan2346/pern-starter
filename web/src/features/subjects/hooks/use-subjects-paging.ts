import { useState } from 'react';

const NUMBER_OF_RECORDS_PER_PAGE = 10;

interface UseSubjectsPaging {
  take: number;
  skip: number;
  handlePageChange: (pageNumber: number) => void;
  pageNumber: number;
  resetPaging: () => void;
}

export function useSubjectsPaging(): UseSubjectsPaging {
  const [skip, setSkip] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  function handlePageChange(pageNum: number) {
    setSkip(NUMBER_OF_RECORDS_PER_PAGE * (pageNum - 1));
    setPageNumber(pageNum);
  }

  function resetPaging() {
    setSkip(0);
    setPageNumber(1);
  }

  return {
    take: NUMBER_OF_RECORDS_PER_PAGE,
    skip,
    handlePageChange,
    pageNumber,
    resetPaging,
  };
}
