import { NextResponse } from 'next/server';
import { respondWithError } from '../errors';
import { auth } from '@/auth';

export const GET = auth(async function GET({ auth }) {
  if (!auth) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const data = {
      message: 'This is a Private API response.',
      auth,
    };

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return respondWithError(error);
  }
});
