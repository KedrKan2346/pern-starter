import { useState } from 'react';

export type SortDirection = 'ASC' | 'DESC';

interface UseSubjectsSorting {
  sortByColumn?: string;
  sortDirection: SortDirection;
  handleSortByColumnChange: (columnName?: string) => void;
  handleSortDirectionChange: (sortDirection: SortDirection) => void;
}

export function useSubjectsSorting(): UseSubjectsSorting {
  const [sortByColumn, setSortByColumn] = useState<string>();
  const [sortDirection, setSortDirection] = useState<SortDirection>('ASC');

  function handleSortByColumnChange(columnName?: string) {
    setSortByColumn(columnName);
  }

  function handleSortDirectionChange(sortDirection: SortDirection) {
    setSortDirection(sortDirection);
  }

  return {
    sortByColumn,
    sortDirection,
    handleSortByColumnChange,
    handleSortDirectionChange,
  };
}
