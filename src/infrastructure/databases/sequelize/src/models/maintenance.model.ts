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

import Bike from './bike.model';

@Table({
  tableName: 'maintenances',
  modelName: 'Maintenance',
  timestamps: true,
  underscored: true,
})
export default class Maintenance extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({
    allowNull: false,
  })
  declare label: string;

  @ForeignKey(() => Bike)
  @Column({
    field: 'bike_id',
    allowNull: false,
  })
  declare bikeId: string;

  @BelongsTo(() => Bike)
  declare bike: Bike;

  @Column({
    allowNull: false,
  })
  declare lastMaintenanceDate: Date;

  @Column({
    allowNull: false,
  })
  declare nextMaintenanceDate: Date;

  @Column({
    allowNull: false,
    type: DataType.ENUM('maintenance_type_1', 'maintenance_type_2'),
  })
  declare maintenanceType: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
