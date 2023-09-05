import { IUser } from './IUser'
import { IUserPayload } from './IUserPayload'

export interface IUserModel {
  activateUser(id:number): Promise<IUser | number>;
  createUser(UserPayload: IUserPayload): Promise<IUser>;
  getUserByEmail(email: string): Promise<IUser | null>;
  updateUserById(id: number, userPayload: IUserPayload): Promise<IUser | number>
}