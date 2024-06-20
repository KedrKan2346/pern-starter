import { Table, LoadingOverlay } from '@mantine/core';
import { ReactElement } from 'react';
import { RootLayout, WithNavigationLayout } from '@shared-layouts';
import { useSubjects } from '../hooks/use-subjects';
import { SubjectViewModel } from '../viewmodels';

function SubjectItemRow(subjectItem: SubjectViewModel): ReactElement {
  const { name, sex, status, diagnosisDate, id } = subjectItem;
  return (
    <Table.Tr key={id}>
      <Table.Td>{name}</Table.Td>
      <Table.Td>{sex}</Table.Td>
      <Table.Td>{status}</Table.Td>
      <Table.Td>{diagnosisDate}</Table.Td>
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
        <div>
          <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
          {!isLoading && hasError && <div>Request Failed</div>}
          {!isLoading && !hasError && <SubjectItemsTable subjectItems={entities} />}
        </div>
      </WithNavigationLayout>
    </RootLayout>
  );
}
