import { useParams } from 'react-router-dom';
import { Box, Center, LoadingOverlay } from '@mantine/core';
import { RootLayout, WithNavigationLayout } from '@shared-layouts';
import { AddOrEditSubject } from './AddOrEditSubject';
import { useEditSubject } from '../hooks/use-edit-subject';
import { Errors } from './Errors';

export function EditSubject() {
  const { id } = useParams();
  const { isLoading, serverErrors, entity } = useEditSubject({ entityId: id });
  const hasError = serverErrors.length > 0;

  return (
    <RootLayout>
      <WithNavigationLayout>
        <Box pos="relative">
          <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
          {!isLoading && !hasError && (
            <AddOrEditSubject formTitle="Edit Subject" mode="edit" entity={entity} />
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
