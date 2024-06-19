export type SexDto = "male" | "female";

export type SubjectStatusDto = "in_progress" | "enrolled" | "failed";

export interface SubjectDto {
  id: string;
  name: string;
  sex: SexDto;
  status: SubjectStatusDto;
  diagnosisDate: string;
  createdAt: string;
  updatedAt: string;
}
