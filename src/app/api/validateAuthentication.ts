import { auth } from '@/auth';
import { ResponseError } from './errors';

export async function validateAuthentication() {
  const authSession = await auth();
  if (!authSession?.user) {
    console.error(`User not logged in: ${authSession}`);
    throw new ResponseError(401, 'User not logged in');
  }
  return authSession;
}
