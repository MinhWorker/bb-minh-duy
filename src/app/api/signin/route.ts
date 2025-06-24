// app/api/auth/signin/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import db from '../../../../db/drizzle';
import { comparePassword, createSessionToken } from '../../../../lib/auth';
import { users } from '../../../../db/schema';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ message: 'Username and password are required' }, { status: 400 });
    }

    const user = await db.query.users.findFirst({
      where: eq(users.username, username),
    });

    if (!user || !await comparePassword(password, user.password)) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const sessionToken = await createSessionToken(user.id);

    const response = NextResponse.json({ message: 'Sign-in successful' }, { status: 200 });

    // Set HttpOnly, Secure (for HTTPS), SameSite=Lax cookie
    response.cookies.set('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use true in production
      sameSite: 'lax',
      maxAge: 60 * 60, // 1 hour
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Sign-in error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
