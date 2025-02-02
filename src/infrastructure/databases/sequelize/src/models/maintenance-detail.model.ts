import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

import Maintenance from './maintenance.model';
import SparePart from './spare-part.model';

@Table({
  tableName: 'maintenance_details',
  modelName: 'MaintenanceDetail',
  timestamps: true,
  underscored: true,
})
export default class MaintenanceDetail extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({
    allowNull: false,
  })
  declare label: string;

  @ForeignKey(() => Maintenance)
  @Column({
    field: 'maintenance_id',
    allowNull: false,
  })
  declare maintenanceId: string;

  @BelongsTo(() => Maintenance)
  declare maintenance: Maintenance;

  @ForeignKey(() => SparePart)
  @Column({
    field: 'spare_part_id',
    allowNull: false,
  })
  declare sparePartId: string;

  @BelongsTo(() => SparePart)
  declare sparePart: SparePart;

  @Column({
    allowNull: false,
  })
  declare maintenanceType: string;

  @Column({
    allowNull: false,
  })
  declare price: number;

  @Column({
    allowNull: false,
  })
  declare comments: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
