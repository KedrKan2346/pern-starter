import { DataSource, FindOptionsOrderValue, FindOptionsWhere, In, Raw, Repository } from 'typeorm';
import { Logger } from 'winston';
import { CreateOrUpdateSubjectRequestDto, SubjectDto, SexDto, SubjectStatusDto } from '../../domain/dto';
import { SortableColumns, SubjectPersistence, isSortableColumn } from '../../domain/persistence';
import {} from '../../domain/subject-domain-entity';
import { TypeOrmSubjectPersistence } from './type-orm-subject-persistence';

function mapSexToDto(value: string): SexDto {
  switch (value) {
    case 'male':
      return 'male';
    case 'female':
      return 'female';
    default:
      throw new Error(`Sex [${value}] is not supported.`);
  }
}

function mapSubjectStatusToDto(value: string): SubjectStatusDto {
  switch (value) {
    case 'in_progress':
      return 'in_progress';
    case 'enrolled':
      return 'enrolled';
    case 'failed':
      return 'failed';
    default:
      throw new Error(`Subject status [${value}] is not supported.`);
  }
}

function mapSubjectPersistenceEntityToDto(persistenceEntity: TypeOrmSubjectPersistence): SubjectDto {
  const { id, name, sex, status, diagnosisDate, createdAt, updatedAt } = persistenceEntity;
  return {
    id,
    name,
    sex: mapSexToDto(sex),
    status: mapSubjectStatusToDto(status),
    diagnosisDate,
    createdAt,
    updatedAt,
  };
}

/**
 * TypeORM framework based persistence service.
 */
export class TypeOrmSubjectPersistenceService implements SubjectPersistence {
  private repository: Repository<TypeOrmSubjectPersistence>;

  /**
   * Constructor.
   * @param dataSource Initialized and connected to database TypeORM data source.
   * @param logger Service logger.
   */
  constructor(
    private readonly dataSource: DataSource,
    private readonly logger: Logger
  ) {
    this.repository = this.dataSource.getRepository(TypeOrmSubjectPersistence);
  }

  /**
   * Get paginated subjects from database.
   * @param take Number of records to return (for paging).
   * @param skip Number of records to skip (for paging).
   * @returns All subjects limited by "take" parameter.
   */
  async getAllPaged(
    take: number,
    skip: number,
    sortby: SortableColumns | undefined,
    sortorder: string | undefined,
    nameLookupText: string | undefined,
    sexFilterValues: string[] | undefined,
    statusFilterValues: string[] | undefined
  ): Promise<{ total: number; entities: SubjectDto[] }> {
    let sortDirection: FindOptionsOrderValue = 'ASC';
    if (sortorder && sortorder.toLocaleLowerCase() === 'desc') {
      sortDirection = 'DESC';
    }

    let sortByColumn = 'createdAt';
    if (sortby && isSortableColumn(sortby)) {
      sortByColumn = sortby;
    }

    // Filter by name
    const where: FindOptionsWhere<TypeOrmSubjectPersistence> = {};
    if (nameLookupText) {
      // IMPORTANT: This is XSS vulnerable string but this text is validated in route middleware.
      // The raw condition is needed to achieve case insensitive search without changing collation in database.
      where.name = Raw((alias) => `LOWER(${alias}) Like '%${nameLookupText.toLowerCase()}%'`);
    }
    // Filter by sex
    if (sexFilterValues && sexFilterValues.length > 0) {
      where.sex = In(sexFilterValues);
    }
    // Filter by status
    if (statusFilterValues && statusFilterValues.length > 0) {
      where.status = In(statusFilterValues);
    }

    const pagedResult = await this.repository.findAndCount({
      take,
      skip,
      order: { [sortByColumn]: sortDirection },
      where,
    });
    const [entities, total] = pagedResult;
    return {
      total,
      entities: entities.map(mapSubjectPersistenceEntityToDto),
    };
  }

  /**
   * Create new subject in database.
   * @param dto Subject DTO.
   * @returns Plain object containing id, createdAt, and updatedAt fields.
   */
  async create(
    dto: CreateOrUpdateSubjectRequestDto
  ): Promise<Pick<SubjectDto, 'id' | 'createdAt' | 'updatedAt'>> {
    const newEntity = this.repository.create(dto);
    const insertedEntity = await this.repository.insert(newEntity);
    return insertedEntity.raw;
  }

  /**
   * Get subject by id from database.
   * @param id Subject id.
   * @returns Subject DTO or null.
   */
  async findById(id: string): Promise<SubjectDto | null> {
    const result = await this.repository.findOneBy({ id });
    if (result) {
      return mapSubjectPersistenceEntityToDto(result);
    }
    return null;
  }

  /**
   * Update subject by id in database.
   * @param id Subject id.
   * @param dto Subject DTO.
   * @returns Number of affected records
   */
  async updateById(id: string, dto: CreateOrUpdateSubjectRequestDto): Promise<number> {
    const insertedEntity = await this.repository.update({ id }, dto);
    return insertedEntity.affected;
  }

  async deleteById(id: string): Promise<number> {
    const deletedEntity = await this.repository.delete({ id });
    return deletedEntity.affected;
  }
}
