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

import User from './user.model';

@Table({
  tableName: 'dealers',
  modelName: 'Dealer',
  timestamps: true,
  underscored: true,
})
export default class Dealer extends Model {
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
  declare address: string;

  @HasMany(() => User)
  declare users: User[];

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
