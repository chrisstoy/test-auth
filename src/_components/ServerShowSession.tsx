import { auth } from '@/auth';

export async function ServerShowSession() {
  const session = await auth();
  return (
    <>
      <h2 className="text-xl mx-2">Server Component</h2>
      <pre className="mx-4">{JSON.stringify(session, null, 2)}</pre>
    </>
  );
}
