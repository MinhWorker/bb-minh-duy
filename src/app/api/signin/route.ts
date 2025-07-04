// app/api/auth/signin/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import db from '../../../../db/drizzle';
import { users } from '../../../../db/schema';
import { comparePassword, createSessionToken } from '../../../../lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: 'Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.' },
        { status: 400 }
      );
    }

    const user = await db.query.users.findFirst({
      where: eq(users.username, username),
    });

    if (!user || !(await comparePassword(password, user.password))) {
      return NextResponse.json(
        { message: 'Tài khoản đăng nhập chưa chính xác.' },
        { status: 401 }
      );
    }

    const sessionToken = await createSessionToken(user.id); // user.id is a number now

    const response = NextResponse.json(
      { message: 'Đăng nhập thành công' },
      { status: 200 }
    );

    response.cookies.set('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60, // 1 hour
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Sign-in error:', error);
    return NextResponse.json(
      { message: 'Hệ thống gặp vấn đề, vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}

