// lib/auth.ts
import bcrypt from 'bcryptjs';
import * as jose from 'jose';
import { NextRequest } from 'next/server';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);
const JWT_LIFETIME_SECONDS = 60 * 30; // 30 minutes

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createSessionToken(userId: number): Promise<string> {
  const token = await new jose.SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(Math.floor(Date.now() / 1000) + JWT_LIFETIME_SECONDS)
    .sign(JWT_SECRET);

  return token;
}

export async function verifySessionToken(token: string): Promise<{ userId: number } | null> {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET, {
      algorithms: ['HS256'],
    });

    // ✅ Check if userId is a number (serial ID)
    if (typeof payload.userId === 'number') {
      return { userId: payload.userId };
    }

    return null;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}

export async function getSessionUser(req: NextRequest): Promise<{ id: number } | null> {
  const token = req.cookies.get('session')?.value;
  if (!token) {
    return null;
  }

  const session = await verifySessionToken(token);
  if (!session) {
    return null;
  }
  return { id: session.userId };
}
