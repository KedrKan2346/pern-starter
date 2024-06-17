import { Column, PrimaryColumn, Entity } from 'typeorm';
import { TypeOrmBaseEntity } from '@features/shared/infrastructure';

/**
 * Subject persistence entity which describes metadata for TypeORM framework.
 */
@Entity('subjects')
export class TypeOrmSubjectPersistence extends TypeOrmBaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 6, nullable: false })
  sex: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  status: string;

  @Column({ name: 'diagnosis_date', type: 'timestamp', nullable: false })
  diagnosisDate: Date;
}
