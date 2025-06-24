import { NextRequest, NextResponse } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(req: NextRequest) {
  const response = NextResponse.json({ message: 'Signed out' });
  response.cookies.set({
    name: 'session',
    value: '',
    path: '/',
    expires: new Date(0), // Expire immediately
  });
  return response;
}
