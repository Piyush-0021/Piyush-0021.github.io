// src/lib/jwt.ts
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error('❌ JWT_SECRET must be defined in .env.local');
}

// ✅ Type cast only after checking existence
const jwtSecret: string = secret;

// Sign JWT Token
export function signToken(
  payload: object,
  expiresIn: SignOptions['expiresIn'] = '7d'
): string {
  return jwt.sign(payload, jwtSecret, { expiresIn });
}

// Verify JWT Token
export function verifyToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, jwtSecret);
    return typeof decoded === 'object' ? (decoded as JwtPayload) : null;
  } catch (error) {
    console.error('❌ JWT verification failed:', error);
    return null;
  }
}
