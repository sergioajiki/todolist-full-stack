import { UserStatus } from './UserStatus';

export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  activationCode: string;
  status: UserStatus | number;
}