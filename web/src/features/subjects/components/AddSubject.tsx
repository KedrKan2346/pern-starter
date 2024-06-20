import { RootLayout, WithNavigationLayout } from '@shared-layouts';
import { DateInput } from '@mantine/dates';
import { Button, Group, TextInput, Title, Select, Center } from '@mantine/core';
import { useAddSubjects } from '../hooks/use-add-subjects';
import styles from './add-subject.module.css';
import { Errors } from './Errors';
import { SubmissionSuccessful } from './SubmissionSuccessful';

export function AddSubject() {
  const { form, handleFormSubmit, serverErrors, submitIsComplete } = useAddSubjects();
  const hasServerErrors = serverErrors.length > 0;

  return (
    <RootLayout>
      <WithNavigationLayout>
        <Center>
          <div className={styles.content}>
            <Center>
              <Title order={2}>Add Subject</Title>
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
              {submitIsComplete && <SubmissionSuccessful />}
              {hasServerErrors && <Errors errors={serverErrors} />}
              <Group justify="center" mt="md">
                <Button type="submit">Submit</Button>
              </Group>
            </form>
          </div>
        </Center>
      </WithNavigationLayout>
    </RootLayout>
  );
}
