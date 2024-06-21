import { ReactElement } from 'react';
import { Flex, Select } from '@mantine/core';
import { SortDirection } from '../hooks/use-subjects-sorting';
import styles from './subjects-toolbox.module.css';

interface SubjectsToolbox {
  sortByColumn?: string;
  sortDirection: SortDirection;
  onSortColumnChange: (columnName?: string) => void;
  onSortDirectionChange: (sortDirection: SortDirection) => void;
}

export function SubjectsToolbox({
  sortByColumn,
  sortDirection,
  onSortColumnChange,
  onSortDirectionChange,
}: SubjectsToolbox): ReactElement {
  return (
    <Flex justify="flex-start" align="center" gap="md" className={styles.toolbox}>
      <Select
        label="Sort by Column"
        placeholder="Pick column"
        data={[
          { label: 'none', value: '' },
          { label: 'Name', value: 'name' },
          { label: 'Sex', value: 'sex' },
          { label: 'Status', value: 'status' },
          { label: 'Diagnosis Date', value: 'diagnosisDate' },
        ]}
        onChange={(value) => onSortColumnChange(value ? value : undefined)}
        value={sortByColumn}
      />
      <Select
        label="Sort Direction"
        placeholder="Pick direction"
        data={[
          { label: 'ASC', value: 'ASC' },
          { label: 'DESC', value: 'DESC' },
        ]}
        onChange={(value) => onSortDirectionChange(value as SortDirection)}
        value={sortDirection}
      />
    </Flex>
  );
}
