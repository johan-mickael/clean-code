import { BelongsTo, Column, CreatedAt, DataType, Default, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import DrivingHistory from './driving-history.model';

@Table({
  tableName: 'driving_incidents',
  modelName: 'DrivingIncident',
  timestamps: true,
  underscored: true,
})
export default class DrivingIncident extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @ForeignKey(() => DrivingHistory)
  @Column({
    field: 'driving_history_id',
    allowNull: false,
  })
  declare drivingHistoryId: string;

  @BelongsTo(() => DrivingHistory)
  declare drivingHistory: DrivingHistory;

  @Column({
    allowNull: false,
  })
  declare label: string;

  @Column({
    allowNull: false,
  })
  declare comments: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
