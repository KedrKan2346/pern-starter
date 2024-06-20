import { getServiceConfiguration } from '@/shared/config';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useMutation } from 'react-query';

interface SubjectFormData {
  name: string;
  sex: string;
  status: string;
  diagnosisDate: string;
}

export function useAddSubjects() {
  const { webApiUrl } = getServiceConfiguration();
  const [submitIsComplete, setSubmitIsComplete] = useState<boolean>(false);
  const [serverErrors, setServerErrors] = useState<string[]>([]);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      sex: '',
      status: '',
      diagnosisDate: '',
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
      return fetch(`${webApiUrl}/subjects`, {
        method: 'POST',
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

  return {
    form,
    handleFormSubmit,
    serverErrors,
    submitIsComplete,
  };
}
