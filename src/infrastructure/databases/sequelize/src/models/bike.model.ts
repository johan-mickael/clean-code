import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

import BikeModel from './bike-model.model';
import Partner from './partner.model';
import Trial from './trial.model';
import Visit from './visit.model';

@Table({
  tableName: 'bikes',
  modelName: 'Bike',
  timestamps: true,
  underscored: true,
})
export default class Bike extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @ForeignKey(() => Partner)
  @Column
  declare partnerId: string;

  @BelongsTo(() => Partner)
  declare partner: Partner;

  @ForeignKey(() => BikeModel)
  @Column
  declare bikeModelId: string;

  @BelongsTo(() => BikeModel)
  declare bikeModel: BikeModel;

  @Column
  declare mileage: number;

  @Column
  declare status: number;

  @Column
  declare circulationDate: Date;

  @HasMany(() => Trial)
  declare trials: Trial[];

  @HasMany(() => Visit)
  declare visits: Visit[];

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
