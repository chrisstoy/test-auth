'use client';
import { useSession } from 'next-auth/react';

export function ClientShowSession() {
  const session = useSession();

  return (
    <>
      <h2 className="text-xl mx-2">Client Component</h2>
      <pre className="mx-4">{JSON.stringify(session, null, 2)}</pre>
    </>
  );
}
