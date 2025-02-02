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
import Driver from './driver.model';

@Table({
  tableName: 'driving_history',
  modelName: 'DrivingHistory',
  timestamps: true,
  underscored: true,
})
export default class DrivingHistory extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @ForeignKey(() => Driver)
  @Column({
    field: 'driver_id',
    allowNull: false,
  })
  declare driverId: string;

  @ForeignKey(() => Bike)
  @Column({
    field: 'bike_id',
    allowNull: false,
  })
  declare bikeId: string;

  @BelongsTo(() => Driver)
  declare driver: Driver;

  @BelongsTo(() => Bike)
  declare bike: Bike;

  @Column({
    allowNull: false,
  })
  declare label: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
