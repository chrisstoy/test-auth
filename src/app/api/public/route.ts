import { NextResponse } from 'next/server';
import { respondWithError } from '../errors';
import { auth } from '@/auth';

export async function GET() {
  const session = await auth();
  try {
    const data = {
      message: 'This is a Public API response.',
      session,
    };

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return respondWithError(error);
  }
}
