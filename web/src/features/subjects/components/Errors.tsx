import { Alert } from '@mantine/core';
import { IconExclamationCircle } from '@tabler/icons-react';
import { ReactElement } from 'react';
import styles from './errors.module.css';

export function Errors({ errors }: { errors: string[] }): ReactElement {
  const icon = <IconExclamationCircle />;
  return (
    <Alert variant="light" color="red" title="Errors" icon={icon} className={styles.content}>
      {errors.map((error, pos) => {
        return <div key={`server-error=${pos}`}>{error}</div>;
      })}
    </Alert>
  );
}
