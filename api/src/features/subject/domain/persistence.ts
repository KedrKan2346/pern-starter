import { CreateOrUpdateSubjectRequestDto, SubjectDto } from './dto';

export type SortableColumns = 'name' | 'sex' | 'status' | 'diagnosisDate';

export function isSortableColumn(value: string): value is SortableColumns {
  return value && ['name', 'sex', 'status', 'diagnosisDate'].includes(value);
}

/**
 * Subject persistence abstraction.
 */
export interface SubjectPersistence {
  /**
   * Get paginated subject.
   * @param take Number of records to return (for paging).
   * @param skip Number of records to skip (for paging).
   * @returns All subjects limited by "take" parameter.
   */
  getAllPaged: (
    take: number,
    skip: number,
    sortby: SortableColumns | undefined,
    sortorder: string | undefined
  ) => Promise<{ total: number; entities: SubjectDto[] }>;

  /**
   * Create new subject.
   * @param dto Subject DTO.
   * @returns Plain object containing id, createdAt, and updatedAt fields.
   */
  create: (
    dto: CreateOrUpdateSubjectRequestDto
  ) => Promise<Pick<SubjectDto, 'id' | 'createdAt' | 'updatedAt'>>;

  /**
   * Get subject by id.
   * @param id Subject id.
   * @returns Subject or null
   */
  findById: (id: string) => Promise<SubjectDto | null>;

  /**
   * Update subject by id.
   * @param id Subject id.
   * @param dto Subject DTO.
   * @returns Number of affected records.
   */
  updateById: (id: string, dto: CreateOrUpdateSubjectRequestDto) => Promise<number>;

  deleteById: (id: string) => Promise<number>;
}
