import SequelizeUsers from '../database/model/sequelizeUsers';

import { IUser } from '../interfaces/User/IUser';
import { IUserModel } from '../interfaces/User/IUserModel';
import { IUserPayload } from '../interfaces/User/IUserPayload';

export default class UserModel implements IUserModel {
  private model = SequelizeUsers;

  async getUserByEmail(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({
      where: { email }
    })
    return !user ? null : user;
  }

  async getUserById(id: number): Promise<IUser | null> {
    const user = await this.model.findByPk(id, {
      attributes: {exclude: ['password']}
    })
    return !user ? null : user;
  }

  async createUser(userPayload: IUser): Promise<IUser> {
    const newUser = await this.model.create(userPayload);
    return newUser;
  }

  async updateUserById(id: number, userPayload: IUserPayload): Promise<number | IUser> {
    const [updatedUser] = await this.model.update(userPayload, {
      where: { id },
    })
    return updatedUser
  }

  async activateUser(id: number): Promise<number | IUser> {
    const [updatedUser] = await this.model.update({ status: 1 }, {
      where: { id },
    })
    return updatedUser
  }
}
