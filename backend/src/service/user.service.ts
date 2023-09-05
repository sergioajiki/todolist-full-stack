import { IUserModel } from '../interfaces/User/IUserModel';
import { IUserPayload } from '../interfaces/User/IUserPayload';
import { ServiceResponse } from '../interfaces/ServiceResponse';
import UserModel from '../model/user.model';


export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel()
  ) {}
  
}