import jwt from 'jsonwebtoken';
import { TokenPayload } from '../interfaces/Token';
import { Secret } from 'jsonwebtoken';
import 'dotenv/config';

export default class JwtUtils {
    private static jwtSecret = process.env.JWT_SECRET as Secret
    private static jwtOptions = { expiresIn: '30m'}

    public static sign(payload: TokenPayload): string {
      return jwt.sign(payload, this.jwtSecret, this.jwtOptions);
    }
  
    public static verify(token: string): jwt.JwtPayload {
      const decodedToken = jwt.verify(token, this.jwtSecret);
      return decodedToken as TokenPayload;
    }
  }

