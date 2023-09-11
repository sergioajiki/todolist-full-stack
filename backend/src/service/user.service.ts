import { IUser } from '../interfaces/User/IUser';
import { IUserModel } from '../interfaces/User/IUserModel';
import { IUserPayload } from '../interfaces/User/IUserPayload';
import { ServiceResponse, ServiceMessage } from '../interfaces/ServiceResponse';
import { ILogin } from '../interfaces/ILogin';
import { Token } from '../interfaces/Token';
import UserModel from '../model/user.model';
import BcryptUtils from '../utils/bcryptUtils';
import buildActivationUrl from '../utils/activationUrlBuilder';
import emailBullService from '../utils/emailBullService';
import JwtUtils from '../utils/jwUtils';


export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
    private bcryptUtils = new BcryptUtils(),
  ) {}

  public async createUser(userPayload: IUserPayload): Promise<ServiceResponse<string>> {
    // console.log('aqui antes do get');
    const isEmail = await this.userModel.getUserByEmail(userPayload.email);
    console.log('depois do get');
    
    if (isEmail) return { status: 'CONFLICT', data: { message: 'Email is already registered' } }
    console.log('is email', isEmail);
    
    
    const payload = {
      username: userPayload.username,
      email: userPayload.email,
      password: this.bcryptUtils.hashPassword(userPayload.password),
      activationCode: 'colocar activation code',
      status: 0,
    }

      console.log('payload', payload);
      
    const newUser = await this.userModel.createUser(payload);
    console.log('aqui o newUser', newUser);
    
    const { id, username, activationCode, email } = newUser;
    const activationUrl = buildActivationUrl( { id, activationCode } );
    await emailBullService.emailQueue.add({ email, username, activationUrl})

    return {
      status: 'CREATE',
      data: { message: 'Usuário foi cadastrado! Verifique seu email para ativar sua conta' }
    }
  }

  public async getUserById(id: number): Promise<ServiceResponse<IUser | null>> {
    const userById = await this.userModel.getUserById(+id);
    if (!userById) {
      return { status: 'NOT_FOUND', data: { message: 'User not found'} }
    }
    return { status: 'SUCCESSFUL', data: userById}
  }

  public async activateUser(id: number, activationCode: string)
  : Promise<ServiceResponse<ServiceMessage>> {
    const user = await this.userModel.getUserById(+id);
    if(!user){
      return { status: 'NOT_FOUND', data: { message: 'User not found' } }
    }
    if(user?.status === 1) {
      return { status: 'CONFLICT', data: { message: `User with id ${id} already activated` } }
    }
    if(user.activationCode !== activationCode) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid Activation Code' } }
    }
    await this.userModel.activateUser(id)
    return { status: 'CREATE', data: { message: 'Your account has been activated' } }
  }

  public async login(loginInfo: ILogin): Promise<ServiceResponse<Token>> {
    const { email, password } = loginInfo
    const userInfo = await this.userModel.getUserByEmail(email);
    if (!userInfo){
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    const isValidPassword = this.bcryptUtils.checkPassword(password, userInfo.password);
    if (!isValidPassword) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    if (userInfo.status === 0) {
      return { status: 'UNAUTHORIZED', data: { message: 'Verifique o email para ativar a conta' } };
    }
    
    const payload = { id: userInfo.id, email: userInfo.email };
    const token = JwtUtils.sign(payload)
    return { status: 'SUCCESSFUL', data: { token } };
  }
}