import { Notification, rem } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { ReactElement } from 'react';

export function SubmissionSuccessful({ onClose }: { onClose?: () => void }): ReactElement {
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;
  return (
    <Notification icon={checkIcon} color="teal" mt="md" onClose={onClose} withCloseButton={Boolean(onClose)}>
      Form submitted successfully
    </Notification>
  );
}
