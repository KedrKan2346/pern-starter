import { getServiceConfiguration } from "@/shared/config";
import { useForm } from "@mantine/form";
import { useMutation } from "react-query";

interface SubjectFormData {
  name: string;
}

export function useAddSubjects() {
  const { webApiUrl } = getServiceConfiguration();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
    },

    validate: {
      name: (value) => (value && value.length <= 255 ? null : "Invalid name"),
    },
  });

  const mutation = useMutation({
    mutationFn: (formData: SubjectFormData) => {
      return fetch(`${webApiUrl}/subjects`, {
        method: "POST",
        body: JSON.stringify(formData),
      });
    },
  });

  function handleFormSubmit(formData: SubjectFormData) {
    mutation.mutate(formData);
  }

  return {
    form,
    handleFormSubmit,
  };
}
