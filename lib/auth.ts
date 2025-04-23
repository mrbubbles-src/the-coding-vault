import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET as string;

const createJWT = (payload: object): string => {
  return jwt.sign(payload, secret, { expiresIn: '30d' });
};

const verifyJWT = (token: string): string | jwt.JwtPayload => {
  return jwt.verify(token, secret);
};

export { createJWT, verifyJWT };
