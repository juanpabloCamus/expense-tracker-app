import { DataTypes, Model, Sequelize } from 'sequelize';

class Operation extends Model {
  declare id: number;
  declare description: string;
  declare amount: number;
  declare date: Date;
  declare type: string;
  declare user_id: number;

  static initialize(sequelize: Sequelize) {
    Operation.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        amount: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        type: {
          type: DataTypes.ENUM,
          allowNull: false,
          values: ['income', 'withdrawal'],
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        category_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        tableName: 'operations',
        sequelize,
      },
    );
  }
}

export default Operation;
