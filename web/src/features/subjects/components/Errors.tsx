import { ReactElement } from 'react';
import { Notification, rem } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

export function Errors({ errors, onClose }: { errors: string[]; onClose?: () => void }): ReactElement {
  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
  return (
    <Notification icon={xIcon} color="red" mt="md" onClose={onClose} withCloseButton={Boolean(onClose)}>
      {errors.map((error, pos) => {
        return <div key={`server-error=${pos}`}>{error}</div>;
      })}
    </Notification>
  );
}
