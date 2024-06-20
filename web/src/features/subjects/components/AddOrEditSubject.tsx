import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { DateInput } from '@mantine/dates';
import { Button, Group, TextInput, Title, Select, Center } from '@mantine/core';
import { useAddOrEditSubject } from '../hooks/use-add-or-edit-subject';
import styles from './add-or-edit-subject.module.css';
import { Errors } from './Errors';
import { SubmissionSuccessful } from './SubmissionSuccessful';
import { SubjectDto } from '../domain/dto';

interface AddOrEditSubjectProps {
  formTitle: string;
  mode: 'add' | 'edit';
  entity?: SubjectDto;
}

export function AddOrEditSubject({ formTitle, mode, entity }: AddOrEditSubjectProps): ReactElement {
  const navigate = useNavigate();
  const {
    form,
    handleFormSubmit,
    handleCloseSubmissionSuccessful,
    handleCloseErrors,
    serverErrors,
    submitIsComplete,
  } = useAddOrEditSubject({ mode, entity });
  const hasServerErrors = serverErrors.length > 0;

  function handleClose() {
    navigate('/');
  }

  return (
    <Center>
      <div className={styles.content}>
        <Center>
          <Title order={2}>{formTitle}</Title>
        </Center>
        <form onSubmit={form.onSubmit(handleFormSubmit)}>
          <TextInput
            withAsterisk
            label="Name"
            placeholder="Subject name"
            key={form.key('name')}
            {...form.getInputProps('name')}
            className={styles.inputElement}
          />
          <Select
            withAsterisk
            label="Sex"
            placeholder="Pick sex"
            data={[
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' },
            ]}
            key={form.key('sex')}
            {...form.getInputProps('sex')}
            className={styles.inputElement}
          />
          <Select
            withAsterisk
            label="Status"
            placeholder="Pick status"
            data={[
              { label: 'In Progress', value: 'in_progress' },
              { label: 'Enrolled', value: 'enrolled' },
              { label: 'Failed', value: 'failed' },
            ]}
            key={form.key('status')}
            {...form.getInputProps('status')}
            className={styles.inputElement}
          />
          <DateInput
            withAsterisk
            label="Diagnosis date"
            placeholder="Pick diagnosis date"
            key={form.key('diagnosisDate')}
            {...form.getInputProps('diagnosisDate')}
            className={styles.inputElement}
          />
          {submitIsComplete && <SubmissionSuccessful onClose={handleCloseSubmissionSuccessful} />}
          {hasServerErrors && <Errors errors={serverErrors} onClose={handleCloseErrors} />}
          <Group justify="center" mt="md">
            <Button type="button" variant="default" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </div>
    </Center>
  );
}
