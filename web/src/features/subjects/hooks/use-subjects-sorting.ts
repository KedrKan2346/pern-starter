import { useState } from 'react';

interface UseSubjectsSorting {
  sortByColumn: string | null;
  sortDirection: string | null;
  handleSortByColumnChange: (columnName: string | null) => void;
  handleSortDirectionChange: (sortDirection: string | null) => void;
}

export function useSubjectsSorting(): UseSubjectsSorting {
  const [sortByColumn, setSortByColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<string | null>('ASC');

  function handleSortByColumnChange(columnName: string | null) {
    setSortByColumn(columnName);
  }

  function handleSortDirectionChange(sortDirection: string | null) {
    setSortDirection(sortDirection);
  }

  return {
    sortByColumn,
    sortDirection,
    handleSortByColumnChange,
    handleSortDirectionChange,
  };
}
