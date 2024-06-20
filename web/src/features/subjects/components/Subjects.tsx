import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Table, LoadingOverlay, Title, Center, Box, Pagination, Flex } from '@mantine/core';
import { RootLayout, WithNavigationLayout } from '@shared-layouts';
import { useSubjects } from '../hooks/use-subjects';
import { useSubjectsPaging } from '../hooks/use-subjects-paging';
import { SubjectViewModel } from '../viewmodels';
import { Errors } from './Errors';
import styles from './subjects.module.css';

function SubjectItemRow(subjectItem: SubjectViewModel): ReactElement {
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
    </Table.Tr>
  );
}

interface SubjectItemsTablePros {
  subjectItems: SubjectViewModel[];
  onPageChange?: (value: number) => void;
  numberOfPages: number;
}

function SubjectItemsTable({
  subjectItems,
  onPageChange,
  numberOfPages,
}: SubjectItemsTablePros): ReactElement {
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
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{subjectItems.map(SubjectItemRow)}</Table.Tbody>
      </Table>
      <Flex justify="flex-end" align="center">
        <Pagination total={numberOfPages} onChange={onPageChange} className={styles.paging} />
      </Flex>
    </>
  );
}

export function Subjects(): ReactElement {
  const { handlePageChange, take, skip } = useSubjectsPaging();
  const { entities, serverErrors, isLoading, numberOfPages } = useSubjects({ take, skip });
  const hasError = serverErrors.length > 0;
  return (
    <RootLayout>
      <WithNavigationLayout>
        <Center>
          <Title order={2}>Subjects</Title>
        </Center>
        <Box pos="relative">
          <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
          {!isLoading && !hasError && (
            <SubjectItemsTable
              subjectItems={entities}
              onPageChange={handlePageChange}
              numberOfPages={numberOfPages}
            />
          )}
          {!isLoading && hasError && (
            <Center>
              <Errors errors={serverErrors} />
            </Center>
          )}
        </Box>
      </WithNavigationLayout>
    </RootLayout>
  );
}
