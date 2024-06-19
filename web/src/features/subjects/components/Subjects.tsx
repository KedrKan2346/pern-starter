import { RootLayout, WithNavigationLayout } from "@shared-layouts";
import { useSubjects } from "../hooks/use-subjects";

export function Subjects() {
  const { data, error, isLoading } = useSubjects({});
  const hasError = Boolean(error);
  return (
    <RootLayout>
      <WithNavigationLayout>
        {isLoading && <div>Loading...</div>}
        {!isLoading && hasError && <div>Request Failed</div>}
        {!isLoading && !hasError && <div>{data.length}</div>}
      </WithNavigationLayout>
    </RootLayout>
  );
}
