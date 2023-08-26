import { DataTypes, Model, QueryInterface } from 'sequelize';
import { IUser } from '../../interfaces/IUser';

export default {
  async up (queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IUser>>('users', {
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
      }
    })
  },
  async down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('users');
  }   
}
