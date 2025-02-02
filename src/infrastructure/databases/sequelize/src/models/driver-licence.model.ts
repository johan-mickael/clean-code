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

import Driver from './driver.model';

@Table({
  tableName: 'driver_licenses',
  modelName: 'DriverLicense',
  timestamps: true,
  underscored: true,
})
export default class DriverLicense extends Model {
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

  @BelongsTo(() => Driver)
  declare driver: Driver;

  @Column({
    allowNull: false,
  })
  declare licenseNumber: string;

  @Column({
    allowNull: false,
  })
  declare issueDate: Date;

  @Column({
    allowNull: false,
  })
  declare expiryDate: Date;

  @Column({
    allowNull: false,
  })
  declare licenseClass: string;

  @Column({
    allowNull: false,
  })
  declare stateIssued: string;

  @Column({
    allowNull: false,
  })
  declare isActive: boolean;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
