import { IUserModel } from '../interfaces/User/IUserModel';
import { IUserPayload } from '../interfaces/User/IUserPayload';
import { ServiceResponse } from '../interfaces/ServiceResponse';
import UserModel from '../model/user.model';
import BcryptUtils from '../utils/bcryptUtils';


export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
    private bcryptUtils = new BcryptUtils(),
  ) { }

  public async createUser(userPayload: IUserPayload): Promise<ServiceResponse<string>> {
    const isEmail = await this.userModel.getUserByEmail(userPayload.email);
    if (isEmail) return { status: 'CONFLICT', data: { message: 'Email is already registered' } }
    const payload = {
      username: userPayload.username,
      email: userPayload.email,
      password: this.bcryptUtils.hashPassword(userPayload.password),
      activationCode: 'colocar activation code',
      status: 0,
    }
    const newUser = await this.userModel.createUser(payload);
    console.log(newUser);
    
    return {
      status: 'CREATE',
      data: { message: 'Usuário foi cadastrado! Verifique seu email para ativar sua conta' }
    }

  }
}