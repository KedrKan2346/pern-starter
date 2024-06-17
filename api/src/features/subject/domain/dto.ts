export type SexDto = 'male' | 'female';

export type SubjectStatusDto = 'in_progress' | 'enrolled' | 'failed';

export interface CreateOrUpdateSubjectRequestDto {
  name: string;
  sex: SexDto;
  status: SubjectStatusDto;
  diagnosisDate: Date;
}

export interface SubjectDto {
  id?: string;
  name: string;
  sex: SexDto;
  status: SubjectStatusDto;
  diagnosisDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
