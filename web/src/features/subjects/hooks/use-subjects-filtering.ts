import { useEffect, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
interface UseSubjectsFiltering {
  nameLookupText?: string;
  handleNameLookupTextChange: (lookupText?: string) => void;
  debouncedNameLookupText?: string;
  sexFilterValues: string[];
  statusFilterValues: string[];
  dateRangeFilterValues: [Date | null, Date | null];
  handleSexFilterChange: (values: string[]) => void;
  handleStatusFilterChange: (values: string[]) => void;
  handleDateRangeFilterChange: (value: [Date | null, Date | null]) => void;
}

interface UseSubjectsFilteringProps {
  resetPaging: () => void;
}

export function useSubjectsFiltering({ resetPaging }: UseSubjectsFilteringProps): UseSubjectsFiltering {
  const [nameLookupText, setNameLookupText] = useState<string>();
  const [sexFilterValues, setSexFilterValues] = useState<string[]>([]);
  const [statusFilterValues, setStatusFilterValues] = useState<string[]>([]);
  const [dateRangeFilterValues, setDateRangeFilterValues] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [debouncedNameLookupText] = useDebouncedValue(nameLookupText, 300);

  useEffect(() => {
    if (debouncedNameLookupText) {
      resetPaging();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedNameLookupText]);

  function handleNameLookupTextChange(lookupText?: string) {
    setNameLookupText(lookupText);
  }

  function handleSexFilterChange(values: string[]) {
    setSexFilterValues(values);
    resetPaging();
  }

  function handleStatusFilterChange(values: string[]) {
    setStatusFilterValues(values);
    resetPaging();
  }

  function handleDateRangeFilterChange(value: [Date | null, Date | null]) {
    setDateRangeFilterValues(value);
    resetPaging();
  }

  return {
    nameLookupText,
    debouncedNameLookupText,
    sexFilterValues,
    statusFilterValues,
    dateRangeFilterValues,
    handleNameLookupTextChange,
    handleSexFilterChange,
    handleStatusFilterChange,
    handleDateRangeFilterChange,
  };
}
