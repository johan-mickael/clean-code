import { Column, CreatedAt, DataType, Default, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';

@Table({
  tableName: 'drivers',
  modelName: 'Driver',
  timestamps: true,
  underscored: true,
})
export default class Driver extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({
    allowNull: false,
  })
  declare firstname: string;

  @Column({
    allowNull: false,
  })
  declare lastname: string;

  @Column({
    allowNull: false,
  })
  declare profilePicture: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
