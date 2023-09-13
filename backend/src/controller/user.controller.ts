import { Request, Response } from 'express';
import maptStatusHTTP from '../utils/mapStatusHTTP';
import UserService from '../service/user.service';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) {}

  public async createUser(req: Request, res: Response): Promise<Response> {
    const payload = req.body;
    const response = await this.userService.createUser(payload);
    return res.status(maptStatusHTTP(response.status)).json(response.data)
  }

  public async getUserById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const userById = await this.userService.getUserById(+id);
    return res.status(maptStatusHTTP(userById.status)).json(userById.data)
  }

  public async login(req: Request, res: Response): Promise<Response> {
    const loginInfo = req.body;
    const response = await this.userService.login(loginInfo);
    return res.status(maptStatusHTTP(response.status)).json(response.data)
  }
  
}