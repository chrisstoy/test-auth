import { RouteContext } from '@/types';
import { NextRequest, NextResponse } from 'next/server';
import { respondWithError } from '../../errors';
import { validateAuthentication } from '../../validateAuthentication';
import { auth } from '@/auth';
import { z } from 'zod';

const QueryParamsSchema = z.object({
  foo: z.string(),
  bar: z.string(),
  bim: z.string().optional(),
});

export async function GET(req: NextRequest, { params }: RouteContext) {
  try {
    await validateAuthentication();

    const session = await auth();
    const queryParams = QueryParamsSchema.parse(
      Object.fromEntries(req.nextUrl.searchParams.entries())
    );

    const data = {
      message: 'This is a Private API response.',
      url: req.nextUrl,
      routeParams: {
        ...(await params),
      },
      queryParams,
      session,
    };

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return respondWithError(error);
  }
}
