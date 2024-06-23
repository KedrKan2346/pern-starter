import { ReactElement } from 'react';
import { LoadingOverlay, Title, Center, Box } from '@mantine/core';
import { RootLayout, WithNavigationLayout } from '@shared-layouts';
import { useSubjects } from '../hooks/use-subjects';
import { useSubjectsPaging } from '../hooks/use-subjects-paging';
import { useSubjectsSorting } from '../hooks/use-subjects-sorting';
import { useDeleteSubject } from '../hooks/use-delete-subject';
import { useSubjectsFiltering } from '../hooks/use-subjects-filtering';
import { Errors } from './Errors';
import { SubjectsSort } from './SubjectsSort';
import { SubjectsTable } from './SubjectsTable';
import { SubjectsFilter } from './SubjectsFilter';

export function Subjects(): ReactElement {
  const { handleSortByColumnChange, handleSortDirectionChange, sortByColumn, sortDirection } =
    useSubjectsSorting();
  const { handlePageChange, take, skip, pageNumber, resetPaging } = useSubjectsPaging();
  const {
    nameLookupText,
    debouncedNameLookupText,
    sexFilterValues,
    statusFilterValues,
    dateRangeFilterValues,
    handleSexFilterChange,
    handleNameLookupTextChange,
    handleStatusFilterChange,
    handleDateRangeFilterChange,
  } = useSubjectsFiltering({ resetPaging });
  const { handleDeleteSubject, deletionErrors, handleCloseDeletionErrors } = useDeleteSubject();
  const { entities, serverErrors, isLoading, numberOfPages } = useSubjects({
    take,
    skip,
    sortByColumn: sortByColumn,
    sortDirection: sortDirection,
    nameLookupText: debouncedNameLookupText,
    sexFilterValues,
    statusFilterValues,
    dateRangeFilterValues,
  });
  const hasError = serverErrors.length > 0;
  const hasDeletionErrors = deletionErrors.length > 0;

  return (
    <RootLayout>
      <WithNavigationLayout>
        <Center>
          <Title order={2}>Subjects</Title>
        </Center>
        <SubjectsFilter
          nameLookupText={nameLookupText}
          onNameLookupChange={handleNameLookupTextChange}
          sexFilterValues={sexFilterValues}
          onSexFilterChange={handleSexFilterChange}
          statusFilterValues={statusFilterValues}
          onStatusFilterChange={handleStatusFilterChange}
          dateRangeFilterValues={dateRangeFilterValues}
          onDateRangeFilterChange={handleDateRangeFilterChange}
        />
        <SubjectsSort
          sortByColumn={sortByColumn}
          sortDirection={sortDirection}
          onSortColumnChange={handleSortByColumnChange}
          onSortDirectionChange={handleSortDirectionChange}
        />
        <Box pos="relative">
          <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
          {!isLoading && hasDeletionErrors && (
            <Center>
              <Errors errors={deletionErrors} onClose={handleCloseDeletionErrors} />
            </Center>
          )}
          {!isLoading && !hasError && (
            <SubjectsTable
              subjectItems={entities}
              onPageChange={handlePageChange}
              numberOfPages={numberOfPages}
              onDeleteSubject={handleDeleteSubject}
              pageNumber={pageNumber}
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
