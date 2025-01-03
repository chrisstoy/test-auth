import { NextResponse } from 'next/server';
import { createErrorResponse, respondWithError } from '../errors';
import { auth } from '@/auth';

export async function GET() {
  const session = await auth();
  if (!session) {
    return createErrorResponse(401, 'Auth is required.');
  }

  try {
    const data = {
      message: 'This is a Private API response.',
      session,
    };

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return respondWithError(error);
  }
}
