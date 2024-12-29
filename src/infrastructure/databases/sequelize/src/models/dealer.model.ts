import { Column, CreatedAt, Model, Table, UpdatedAt } from 'sequelize-typescript';

@Table({
  tableName: 'dealers',
  modelName: 'Dealer',
  timestamps: true,
  underscored: true,
})
export default class Dealer extends Model {
  @Column({
    primaryKey: true,
  })
  declare id: string;

  @Column({
    allowNull: false,
  })
  declare name: string;

  @Column({
    allowNull: false,
  })
  declare address: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
