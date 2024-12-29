import { Column, CreatedAt, UpdatedAt, Table, Model, PrimaryKey, Default, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'bike_models',
  modelName: 'BikeModel',
  timestamps: true,
  underscored: true,
})
export default class BikeModel extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({
    allowNull: false,
  })
  declare name: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
