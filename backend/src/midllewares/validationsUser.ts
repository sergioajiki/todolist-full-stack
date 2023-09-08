import { Request, Response, NextFunction } from 'express';


export default class ValidationUser {
  static validateCreateUserFields(req: Request, res: Response, next: NextFunction)
	: Response | void {
		const { username , email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
		next();
	}

  static ValidatePasswordFormat(req: Request, res: Response, next: NextFunction)
	: Response | void {
    const { password } = req.body;
    if (password.length < 6 || password.length > 12) {
      return res.status(400).json({ message: 'Password must be 6 to 12 characters' });
    }
    next();
  }

}