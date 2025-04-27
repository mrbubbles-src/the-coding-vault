import { JWTPayload, SignJWT, jwtVerify } from 'jose';
import { getCookie } from './cookies';
import { IJWT, TRole } from './types';

const createJWT = async (payload: IJWT & JWTPayload): Promise<string> => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('30d')
    .sign(secret);
};

const verifyJWT = async (token: string): Promise<IJWT & JWTPayload> => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const { payload } = await jwtVerify(token, secret);
  if (typeof payload.id === 'string' && typeof payload.role === 'string') {
    return payload as IJWT & JWTPayload;
  }
  throw new Error('Invalid JWT payload');
};

const verifyRole = async (requiredRole: TRole): Promise<boolean> => {
  try {
    const token = await getCookie('token');
    if (!token) return false;
    const decodedToken = (await verifyJWT(token)) as IJWT;
    return decodedToken.role === requiredRole;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const logoutUser = async () => {
  try {
    const res = await fetch('/api/auth/logout', {
      method: 'POST',
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};

export { createJWT, verifyJWT, verifyRole, logoutUser };
