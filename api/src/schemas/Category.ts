import { Model, DataTypes, Sequelize } from "sequelize";

class Category extends Model {
  declare id: number;
  declare name: string;

  static initialize(sequelize: Sequelize) {
    Category.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: 'categories',
        sequelize,
      }
    );
  }
}


export default Category;