import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Table, LoadingOverlay, Title, Center, Box } from '@mantine/core';
import { RootLayout, WithNavigationLayout } from '@shared-layouts';
import { useSubjects } from '../hooks/use-subjects';
import { SubjectViewModel } from '../viewmodels';
import { Errors } from './Errors';

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

function SubjectItemsTable({ subjectItems }: { subjectItems: SubjectViewModel[] }): ReactElement {
  return (
    <Table>
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
  );
}

export function Subjects(): ReactElement {
  const { entities, error, isLoading } = useSubjects({ take: 5, skip: 0 });
  const hasError = Boolean(error);
  return (
    <RootLayout>
      <WithNavigationLayout>
        <Center>
          <Title order={2}>Subjects</Title>
        </Center>
        <Box pos="relative">
          <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
          {!isLoading && !hasError && <SubjectItemsTable subjectItems={entities} />}
          {!isLoading && hasError && (
            <Center>
              <Errors errors={['Unexpected error occurred']} />
            </Center>
          )}
        </Box>
      </WithNavigationLayout>
    </RootLayout>
  );
}
