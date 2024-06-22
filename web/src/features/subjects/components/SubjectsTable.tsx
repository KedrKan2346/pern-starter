import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Button, Flex, Pagination, Table, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import styles from './subjects-table.module.css';
import { SubjectViewModel } from '../viewmodels';

interface SubjectsTableProps {
  subjectItems: SubjectViewModel[];
  onPageChange?: (value: number) => void;
  numberOfPages: number;
  onDeleteSubject: (id: string) => void;
  pageNumber: number;
}

function showConfirmDeletionDialog(id: string, name: string, onDeleteSubject: (entityId: string) => void) {
  return modals.openConfirmModal({
    title: 'Confirm deletion',
    children: <Text size="sm">You are about to delete {name}.</Text>,
    labels: { confirm: 'Confirm', cancel: 'Cancel' },
    onConfirm: () => {
      onDeleteSubject(id);
    },
  });
}

function SubjectsTableRow(
  subjectItem: SubjectViewModel,
  onDeleteSubject: (entityId: string) => void
): ReactElement {
  const { name, sex, status, diagnosisDate, id } = subjectItem;
  return (
    <Table.Tr key={id}>
      <Table.Td>{name}</Table.Td>
      <Table.Td>{sex}</Table.Td>
      <Table.Td>{status}</Table.Td>
      <Table.Td>{diagnosisDate}</Table.Td>
      <Table.Td>
        <Link to={`edit/${id}`}>Edit</Link>
      </Table.Td>
      <Table.Td>
        <Button
          type="button"
          variant="default"
          size="compact-xs"
          onClick={() => {
            showConfirmDeletionDialog(id, name, onDeleteSubject);
          }}
        >
          Delete
        </Button>
      </Table.Td>
    </Table.Tr>
  );
}

export function SubjectsTable({
  subjectItems,
  onPageChange,
  numberOfPages,
  onDeleteSubject,
  pageNumber,
}: SubjectsTableProps): ReactElement {
  return (
    <>
      <Table striped>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Sex</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Diagnosis Date</Table.Th>
            <Table.Th></Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{subjectItems.map((subject) => SubjectsTableRow(subject, onDeleteSubject))}</Table.Tbody>
      </Table>
      <Flex justify="flex-end" align="center">
        <Pagination
          total={numberOfPages}
          onChange={onPageChange}
          className={styles.paging}
          defaultValue={pageNumber}
        />
      </Flex>
    </>
  );
}
