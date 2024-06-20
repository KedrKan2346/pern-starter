import { useState } from 'react';
import { useMutation } from 'react-query';
import { getServiceConfiguration } from '@/shared/config';
import { useForm } from '@mantine/form';
import { SubjectFormData } from '../viewmodels';
import { SubjectDto } from '../domain/dto';
import { mapSubjectDtoToFormDataModel } from '../mappers/mappers';

interface UseAddOrEditSubjectProps {
  mode: 'add' | 'edit';
  entity?: SubjectDto;
}

export function useAddOrEditSubject({ mode, entity }: UseAddOrEditSubjectProps) {
  const { webApiUrl } = getServiceConfiguration();
  const [submitIsComplete, setSubmitIsComplete] = useState<boolean>(false);
  const [serverErrors, setServerErrors] = useState<string[]>([]);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: entity
      ? mapSubjectDtoToFormDataModel(entity)
      : {
          name: '',
          sex: '',
          status: '',
          diagnosisDate: undefined,
        },

    validate: {
      name: (value) => {
        if (!value) {
          return 'Required field';
        }
        if (value.length > 255) {
          return 'Max length is 255 characters';
        }
        return null;
      },
      sex: (value) => (value ? null : 'Required field'),
      status: (value) => (value ? null : 'Required field'),
      diagnosisDate: (value) => (value ? null : 'Required field'),
    },
  });

  const mutation = useMutation({
    mutationFn: (formData: SubjectFormData) => {
      const urlPath = mode === 'add' ? 'subjects' : `subjects/${entity?.id}`;
      return fetch(`${webApiUrl}/${urlPath}`, {
        method: mode === 'add' ? 'POST' : 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: async (response) => {
      const responseBody = await response.json();
      if (response.ok) {
        setServerErrors([]);
        setSubmitIsComplete(true);
        form.reset();
      } else {
        setServerErrors(responseBody?.error?.messages ?? []);
      }
    },
  });

  function handleFormSubmit(formData: SubjectFormData) {
    setServerErrors([]);
    setSubmitIsComplete(false);
    mutation.mutate(formData);
  }

  function handleCloseSubmissionSuccessful() {
    setSubmitIsComplete(false);
  }

  function handleCloseErrors() {
    setServerErrors([]);
  }

  return {
    form,
    handleFormSubmit,
    serverErrors,
    submitIsComplete,
    handleCloseSubmissionSuccessful,
    handleCloseErrors,
  };
}
