import { Request, Response, Router } from 'express';
import UserController from '../controller/user.controller';
import ValidationUser from '../midllewares/validationsUser'

const userController = new UserController();
const router = Router();

router.post(
  '/user/register',
  ValidationUser.validateCreateUserFields,
  ValidationUser.validateEmailFormat,
  ValidationUser.validatePasswordFormat,
  (req: Request, res: Response) => userController.createUser(req, res)
)

router.post(
  '/login',
  ValidationUser.validateLoginFields,
  ValidationUser.validateEmailFormat,
  (req: Request, res: Response) => userController.login(req, res)
)

router.patch(
  '/user/update/:id',
  ValidationUser.validateCreateUserFields,
  ValidationUser.validateEmailFormat,
  (req: Request, res: Response) => userController.updateUserById(req, res)
)

router.get(
  '/users/:id',
  (req: Request, res: Response) => userController.getUserById(req, res)
)

export default router;