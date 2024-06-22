import { ChangeEvent, ReactElement } from 'react';
import { Flex, TextInput, Box, MultiSelect } from '@mantine/core';
import styles from './subjects-filter.module.css';

interface SubjectsFilterProps {
  nameLookupText?: string;
  sexFilterValues: string[];
  statusFilterValues: string[];
  onNameLookupChange: (lookupText: string | undefined) => void;
  onSexFilterChange: (values: string[]) => void;
  onStatusFilterChange: (values: string[]) => void;
}

export function SubjectsFilter({
  nameLookupText,
  sexFilterValues,
  statusFilterValues,
  onNameLookupChange,
  onSexFilterChange,
  onStatusFilterChange,
}: SubjectsFilterProps): ReactElement {
  return (
    <Box className={styles.content}>
      <Flex justify="flex-start" align="center" gap="md">
        <TextInput
          label="Search by Name"
          placeholder="Search by name"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onNameLookupChange(e.currentTarget.value);
          }}
          value={nameLookupText ?? ''}
        />
      </Flex>
      <Flex justify="flex-start" align="center" gap="md">
        <MultiSelect
          label="Filter by Status"
          placeholder="Pick value"
          data={[
            { value: 'in_progress', label: 'In Progress' },
            { value: 'enrolled', label: 'Enrolled' },
            { value: 'failed', label: 'Failed' },
          ]}
          defaultValue={[]}
          clearable
          value={statusFilterValues}
          onChange={onStatusFilterChange}
        />
        <MultiSelect
          label="Filter by Sex"
          placeholder="Pick value"
          data={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
          ]}
          defaultValue={[]}
          clearable
          value={sexFilterValues}
          onChange={onSexFilterChange}
        />
      </Flex>
    </Box>
  );
}
