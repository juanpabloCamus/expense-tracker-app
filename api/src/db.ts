import { Sequelize } from 'sequelize';
import Operation from './schemas/Operation';
import User from './schemas/User';
import Category from './schemas/Category';

const connectionURI =
  process.env.DATABASE_URL ||
  'postgres://postgres:1234@localhost:5432/expense_app';

// Connect to the database
export const sequelize = new Sequelize(connectionURI);

// Initialize the models
User.initialize(sequelize);
Operation.initialize(sequelize);
Category.initialize(sequelize);

// Define the relationships between the models
User.hasMany(Operation, { foreignKey: 'user_id' });
Operation.belongsTo(User, { foreignKey: 'user_id' });

Category.hasMany(Operation, { foreignKey: 'category_id' });
Operation.belongsTo(Category, { foreignKey: 'category_id' });
