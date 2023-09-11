import { Request, Response, Router } from 'express';
import UserController from '../controller/user.controller';
import ValidationUser from '../midllewares/validationsUser'

const userController = new UserController();
const router = Router();

router.post(
  '/login/register',
  ValidationUser.validateCreateUserFields,
  ValidationUser.ValidateEmailFormat,
  ValidationUser.ValidatePasswordFormat,
  (req: Request, res: Response) => userController.createUser(req,res)
)

router.get(
  '/users/:id',
  (req: Request, res: Response) => userController.getUserById(req, res)
)

export default router;