import { Card } from '@/_components/Card';
import { ClientFetchPrivateAPISession } from '@/_components/ClientFetchPrivateAPISession';
import { ClientFetchPublicAPISession } from '@/_components/ClientFetchPublicAPISession';
import { ClientShowSession } from '@/_components/ClientShowSession';
import { ServerShowSession } from '@/_components/ServerShowSession';
import { auth } from '@/auth';
import Link from 'next/link';

export default async function HomePage() {
  const session = await auth();

  return (
    <div className="mx-8">
      <main className="flex flex-col">
        <h1 className="text-2xl">Test AuthJS for APIs</h1>
        {session ? (
          <div className="my-8">
            <h2 className="text-xl mb-4">
              You are currently signed in with sessions:
            </h2>
            <Link
              className="rounded-lg bg-blue-500 p-2"
              href="/api/auth/signout"
            >
              Sign Out
            </Link>
          </div>
        ) : (
          <div className="my-8">
            <h2 className="text-xl mb-4">You are currently signed out.</h2>
            <div className="mb-4 rounded-full">
              <Link
                className="rounded-lg bg-green-500 p-2"
                href="/api/auth/signin"
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 border border-transparent">
          <Card>
            <ServerShowSession></ServerShowSession>
          </Card>
          <Card>
            <ClientShowSession></ClientShowSession>
          </Card>
          <Card>
            <ClientFetchPublicAPISession></ClientFetchPublicAPISession>
          </Card>
          <Card>
            <ClientFetchPrivateAPISession></ClientFetchPrivateAPISession>
          </Card>
        </div>
      </main>
    </div>
  );
}
