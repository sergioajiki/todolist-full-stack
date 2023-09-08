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

  
}