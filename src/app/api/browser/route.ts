import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const hasId = cookieStore.has('browser.id');

  if (!hasId) {
    const generateBrowserId = crypto.randomUUID();

    cookieStore.set('browser.id', generateBrowserId, {
      path: '/',
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 2, // 2 hours
    });
  }

  const browserId = cookieStore.get('browser.id')?.value;

  return NextResponse.json({ browserId });
}
