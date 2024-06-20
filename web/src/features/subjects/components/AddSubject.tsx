import { RootLayout, WithNavigationLayout } from "@shared-layouts";
import { Button, Group, TextInput, Title } from "@mantine/core";
import { useAddSubjects } from "../hooks/use-add-subjects";
import styles from "./add-subject.module.css";

export function AddSubject() {
  const { form, handleFormSubmit } = useAddSubjects();

  return (
    <RootLayout>
      <WithNavigationLayout>
        <div className={styles.content}>
          <Title order={2} className={styles.title}>
            Add Subject
          </Title>
          <form onSubmit={form.onSubmit(handleFormSubmit)}>
            <TextInput
              withAsterisk
              label="Name"
              placeholder="Subject name"
              key={form.key("name")}
              {...form.getInputProps("name")}
            />

            <Group justify="center" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </div>
      </WithNavigationLayout>
    </RootLayout>
  );
}
