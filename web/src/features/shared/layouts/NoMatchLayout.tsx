import { Center, Title } from '@mantine/core';
import { RootLayout } from './RootLayout';
import { WithNavigationLayout } from './WithNavigationLayout';

export function NoMatchLayout() {
  return (
    <RootLayout>
      <WithNavigationLayout>
        <Center>
          <Title order={1}>Page Not found</Title>
        </Center>
      </WithNavigationLayout>
    </RootLayout>
  );
}
