import { Request, Response, Router } from 'express';
import UserController from '../controller/user.controller';

const userController = new UserController();
const router = Router();

router.post(
  '/login/register',
  (req: Request, res: Response) => userController.createUser(req,res)
)

export default router;