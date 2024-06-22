import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
interface UseSubjectsFiltering {
  nameLookupText?: string;
  handleNameLookupTextChange: (lookupText?: string) => void;
  debouncedNameLookupText?: string;
  sexFilterValues: string[];
  statusFilterValues: string[];
  handleSexFilterChange: (values: string[]) => void;
  handleStatusFilterChange: (values: string[]) => void;
}

interface UseSubjectsFilteringProps {
  resetPaging: () => void;
}

export function useSubjectsFiltering({ resetPaging }: UseSubjectsFilteringProps): UseSubjectsFiltering {
  const [nameLookupText, setNameLookupText] = useState<string>();
  const [sexFilterValues, setSexFilterValues] = useState<string[]>([]);
  const [statusFilterValues, setStatusFilterValues] = useState<string[]>([]);
  const [debouncedNameLookupText] = useDebounce(nameLookupText, 300);

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

  return {
    nameLookupText,
    debouncedNameLookupText,
    sexFilterValues,
    statusFilterValues,
    handleNameLookupTextChange,
    handleSexFilterChange,
    handleStatusFilterChange,
  };
}
