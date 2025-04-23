import jwt from 'jsonwebtoken';
import { getCookie } from './cookies';
import { TJWT, TRole } from './types';

const secret = process.env.JWT_SECRET as string;

const createJWT = (payload: object): string => {
  return jwt.sign(payload, secret, { expiresIn: '30d' });
};

const verifyJWT = (token: string): string | jwt.JwtPayload => {
  return jwt.verify(token, secret);
};

const verifyRole = async (requiredRole: TRole): Promise<boolean> => {
  try {
    const token = await getCookie('token');
    if (!token) return false;
    const decodedToken = verifyJWT(token) as TJWT;
    return decodedToken.role === requiredRole;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export { createJWT, verifyJWT, verifyRole };
