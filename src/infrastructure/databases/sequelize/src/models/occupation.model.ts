import { Column, CreatedAt, UpdatedAt, Table, Model } from 'sequelize-typescript';

@Table({
  tableName: 'occupations',
  modelName: 'Occupation',
  timestamps: true,
  underscored: true,
})
export default class Occupation extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    allowNull: false,
  })
  declare name: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
