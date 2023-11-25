import JWT, { VerifyErrors, JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export class Jwt {
  static generateToken(data: any, exp = '1d'): string {
    return JWT.sign(data, process.env.JWT_SECRET, { expiresIn: exp });
  }
  static verifyToken(token: string): { error?: VerifyErrors; value?: JwtPayload } {
    try {
      const decoded = JWT.verify(token, process.env.JWT_SECRET) as JwtPayload;
      return { value: decoded };
    } catch (err) {
      return { error: err as VerifyErrors };
    }
  }
}
