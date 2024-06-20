import { Logger } from 'winston';
import { CreateOrUpdateSubjectRequestDto, SubjectDto } from './dto';
import { SubjectPersistence } from './persistence';
import { SubjectDomainEntity } from './subject-domain-entity';

/**
 * Use cases implement bridge between HTTP requests (routes, controllers), persistence,
 * and domain model and should be frameworks and libs agnostic.
 */
export class SubjectUseCases {
  constructor(
    private readonly persistenceService: SubjectPersistence,
    private readonly logger: Logger
  ) {}

  /**
   * Get paginated subjects.
   * @param take Number of records to return (for paging).
   * @param skip Number of records to skip (for paging).
   * @returns All subjects limited by "take" parameter.
   */
  async getAllPaged(take: number, skip: number): Promise<{ total: number; entities: SubjectDto[] }> {
    return this.persistenceService.getAllPaged(take, skip);
  }

  /**
   * Create new subject.
   * @param dto Subject DTO.
   * @returns Plain object containing id, createdAt, and updatedAt fields.
   */
  async create(
    dto: CreateOrUpdateSubjectRequestDto
  ): Promise<Pick<SubjectDto, 'id' | 'createdAt' | 'updatedAt'>> {
    const domainEntity = new SubjectDomainEntity(dto, this.logger);

    // Using domain model in use case
    domainEntity.validateDto();

    return this.persistenceService.create(domainEntity.toDto());
  }

  /**
   * Get subject by id.
   * @param id Subject id.
   * @returns Subject DTO or null.
   */
  async findById(id: string): Promise<SubjectDto | null> {
    return this.persistenceService.findById(id);
  }

  /**
   * Update subject by id.
   * @param id Subject id.
   * @param dto Subject DTO.
   * @returns Number of affected records
   */
  async updateById(id: string, dto: CreateOrUpdateSubjectRequestDto): Promise<number> {
    const domainEntity = new SubjectDomainEntity(dto, this.logger);

    // Using domain model in use case
    domainEntity.validateDto();

    return this.persistenceService.updateById(id, dto);
  }
}
