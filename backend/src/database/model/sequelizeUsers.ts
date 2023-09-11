import { 
  DataTypes,
  Model, 
  InferAttributes, 
  InferCreationAttributes, 
  CreationOptional,
} from 'sequelize';
import taskdb from './index';

class SequelizeUsers extends Model<InferAttributes<SequelizeUsers>,
InferCreationAttributes<SequelizeUsers>> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare email: string;
  declare password: string;
  declare activationCode: string;
  declare status: number;
}

SequelizeUsers.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  activationCode: {
    type: DataTypes.STRING,
    field: 'activation_code',
    allowNull: false,
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
}, {
  sequelize: taskdb,
  modelName: 'users',
  timestamps: false,
  underscored: true,
});

export default SequelizeUsers;