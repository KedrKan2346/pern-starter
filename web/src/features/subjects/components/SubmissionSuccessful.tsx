import { Alert } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { ReactElement } from 'react';
import styles from './submission-successful.module.css';

export function SubmissionSuccessful(): ReactElement {
  const icon = <IconInfoCircle />;
  return (
    <Alert variant="light" color="green" title="Success" icon={icon} className={styles.content}>
      Form submitted successfully
    </Alert>
  );
}
