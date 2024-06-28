import User from './schemas/User';
import Operation from './schemas/Operation';

Operation.belongsTo(User, { foreignKey: 'user_id' });
