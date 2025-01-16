import { BelongsTo, Column, CreatedAt, DataType, Default, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import BikeModel from './bike-model.model';

@Table({
  tableName: 'maintenance_schedules',
  modelName: 'MaintenanceSchedule',
  timestamps: true,
  underscored: true,
})
export default class MaintenanceSchedule extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @ForeignKey(() => BikeModel)
  @Column({
    field: 'bike_model_id',
    allowNull: false,
  })
  declare bikeModelId: string;

  @BelongsTo(() => BikeModel)
  declare bikeModel: BikeModel;

  @Column({
    allowNull: false,
  })
  declare monthInterval: number;

  @Column({
    allowNull: false,
  })
  declare mileageInterval: number;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
