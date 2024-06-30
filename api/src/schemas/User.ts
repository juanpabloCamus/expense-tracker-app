import { DataTypes, Model, Sequelize } from 'sequelize';

/*
  The declare keyword in TypeScript is used to declare a variable,
  property or method in a class or interface without providing a concrete implementation. 
  Here it is used to indicate that the id property exists in the User class, 
  but its implementation will be handled elsewhere (in this case, through Sequelize's init method).
 */

class User extends Model {
  static initialize(sequelize: Sequelize) {
    User.init(
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
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        balance: {
          type: DataTypes.FLOAT,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'users',
      },
    );
  }
}

export default User;
