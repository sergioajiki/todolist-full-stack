import { Request, Response } from 'express';
import UserService from '../service/user.service';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) {}

}