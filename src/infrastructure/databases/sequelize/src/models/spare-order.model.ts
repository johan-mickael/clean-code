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

import SparePart from './spare-part.model';

@Table({
  tableName: 'spare_orders',
  modelName: 'SpareOrder',
  timestamps: true,
  underscored: true,
})
export default class SpareOrder extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @ForeignKey(() => SparePart)
  @Column({
    field: 'spare_id',
    allowNull: false,
  })
  declare spareId: string;

  @BelongsTo(() => SparePart)
  declare sparePart: SparePart;

  @Column({
    allowNull: false,
  })
  declare quantity: number;

  @Column({
    allowNull: false,
  })
  declare price: number;

  @Column({
    allowNull: false,
  })
  declare deliveryDelayDays: number;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
