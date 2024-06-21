import { ReactElement } from 'react';
import { LoadingOverlay, Title, Center, Box } from '@mantine/core';
import { RootLayout, WithNavigationLayout } from '@shared-layouts';
import { useSubjects } from '../hooks/use-subjects';
import { useSubjectsPaging } from '../hooks/use-subjects-paging';
import { useSubjectsSorting } from '../hooks/use-subjects-sorting';
import { useDeleteSubject } from '../hooks/use-delete-subject';
import { Errors } from './Errors';
import { SubjectsToolbox } from './SubjectsToolbox';
import { SubjectsTable } from './SubjectsTable';

export function Subjects(): ReactElement {
  const { handleSortByColumnChange, handleSortDirectionChange, sortByColumn, sortDirection } =
    useSubjectsSorting();
  const { handlePageChange, take, skip } = useSubjectsPaging();
  const { handleDeleteSubject, deletionErrors, handleCloseDeletionErrors } = useDeleteSubject();
  const { entities, serverErrors, isLoading, numberOfPages } = useSubjects({
    take,
    skip,
    sortByColumn,
    sortDirection,
  });
  const hasError = serverErrors.length > 0;
  const hasDeletionErrors = deletionErrors.length > 0;

  return (
    <RootLayout>
      <WithNavigationLayout>
        <Center>
          <Title order={2}>Subjects</Title>
        </Center>
        <Box pos="relative">
          <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
          {!isLoading && hasDeletionErrors && (
            <Center>
              <Errors errors={deletionErrors} onClose={handleCloseDeletionErrors} />
            </Center>
          )}
          {!isLoading && !hasError && (
            <>
              <SubjectsToolbox
                sortByColumn={sortByColumn}
                sortDirection={sortDirection}
                onSortColumnChange={handleSortByColumnChange}
                onSortDirectionChange={handleSortDirectionChange}
              />
              <SubjectsTable
                subjectItems={entities}
                onPageChange={handlePageChange}
                numberOfPages={numberOfPages}
                onDeleteSubject={handleDeleteSubject}
              />
            </>
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
