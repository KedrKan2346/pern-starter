import { ReactElement } from 'react';
import { Box, Flex, Select } from '@mantine/core';
import styles from './subjects-sort.module.css';

interface SubjectsSortProps {
  sortByColumn: string | null;
  sortDirection: string | null;
  onSortColumnChange: (columnName: string | null) => void;
  onSortDirectionChange: (sortDirection: string | null) => void;
}

export function SubjectsSort({
  sortByColumn,
  sortDirection,
  onSortColumnChange,
  onSortDirectionChange,
}: SubjectsSortProps): ReactElement {
  return (
    <Box className={styles.content}>
      <Flex justify="flex-start" align="center" gap="md">
        <Select
          label="Sort by Column"
          placeholder="Pick column"
          data={[
            { label: 'Name', value: 'name' },
            { label: 'Sex', value: 'sex' },
            { label: 'Status', value: 'status' },
            { label: 'Diagnosis Date', value: 'diagnosisDate' },
          ]}
          onChange={(value) => onSortColumnChange(value)}
          value={sortByColumn}
        />
        <Select
          label="Sort Direction"
          placeholder="Pick direction"
          data={[
            { label: 'ASC', value: 'ASC' },
            { label: 'DESC', value: 'DESC' },
          ]}
          onChange={(value) => onSortDirectionChange(value)}
          value={sortDirection}
          defaultValue={'ASC'}
        />
      </Flex>
    </Box>
  );
}
