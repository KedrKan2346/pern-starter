import { useQuery } from "react-query";

interface UseSubjectsParams {
  take?: number;
  skip?: number;
}

export function useSubjects({ take, skip }: UseSubjectsParams) {
  async function getSubjects() {
    const res = await fetch(
      `${"http://localhost:4500/v1/subjects"}?take=${take}&skip=${skip}`
    );
    return res.json();
  }

  const { data, error, isLoading } = useQuery("subjects", getSubjects);

  return {
    data,
    error,
    isLoading,
  };
}
