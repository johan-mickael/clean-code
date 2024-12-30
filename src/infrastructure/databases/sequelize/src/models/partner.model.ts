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

import Dealer from './dealer.model';

@Table({
  tableName: 'partners',
  modelName: 'Partner',
  timestamps: true,
  underscored: true,
})
export default class Partner extends Model {
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
  declare email: string;

  @ForeignKey(() => Dealer)
  @Column({
    field: 'dealer_id',
    allowNull: false,
  })
  declare dealerId: string;

  @BelongsTo(() => Dealer)
  declare dealer: Dealer;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
