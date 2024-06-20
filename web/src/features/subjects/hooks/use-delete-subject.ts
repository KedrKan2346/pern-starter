import { getServiceConfiguration } from '@/shared/config';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

export function useDeleteSubject() {
  const { webApiUrl } = getServiceConfiguration();
  const [serverErrors, setServerErrors] = useState<string[]>([]);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (entityId: string) => {
      return fetch(`${webApiUrl}/subjects/${entityId}`, {
        method: 'DELETE',
      });
    },
    onError: (/* error */) => {
      setServerErrors(['Unexpected error occurred']);
    },
    onSuccess: async (response) => {
      const responseBody = await response.json();
      if (response.ok) {
        queryClient.invalidateQueries();
      } else {
        setServerErrors(responseBody?.error?.messages ?? []);
      }
    },
  });

  function handleDeleteSubject(entityId: string) {
    setServerErrors([]);
    mutation.mutate(entityId);
  }

  function handleCloseDeletionErrors() {
    setServerErrors([]);
  }

  return {
    deletionErrors: serverErrors,
    handleDeleteSubject,
    handleCloseDeletionErrors,
  };
}
