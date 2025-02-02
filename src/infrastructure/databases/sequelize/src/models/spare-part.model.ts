import {
  Column,
  CreatedAt,
  DataType,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

import SpareOrder from './spare-order.model';

@Table({
  tableName: 'spare_parts',
  modelName: 'SparePart',
  timestamps: true,
  underscored: true,
})
export default class SparePart extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({
    allowNull: false,
  })
  declare name: string;

  @Column({
    allowNull: false,
  })
  declare price: number;

  @Column({
    allowNull: false,
  })
  declare quantity: number;

  @HasMany(() => SpareOrder)
  declare spareOrders: SpareOrder[];

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
