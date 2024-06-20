import { RootLayout, WithNavigationLayout } from '@shared-layouts';
import { AddOrEditSubject } from './AddOrEditSubject';

export function AddSubject() {
  return (
    <RootLayout>
      <WithNavigationLayout>
        <AddOrEditSubject formTitle="Add Subject" mode="add" />
      </WithNavigationLayout>
    </RootLayout>
  );
}
