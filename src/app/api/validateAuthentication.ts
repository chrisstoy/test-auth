import { auth } from '@/auth';
import { ResponseError } from './errors';

export async function validateAuthentication() {
  const authSession = await auth();
  if (!authSession?.user) {
    throw new ResponseError(401, 'User not logged in');
  }
}
