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

}