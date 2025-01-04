import { fetchFromServer } from '@/app/api/api';
import { AuthError } from 'next-auth';
import { headers } from 'next/headers';
import { Suspense } from 'react';

const getData = async () => {
  try {
    const response = await fetchFromServer('/private/5678?foo=bar&bar=baz');

    if (response.status !== 200) {
      throw new AuthError(response.statusText, { status: response.status });
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof AuthError) {
      return error.message;
    }
    return `${error}`;
  }
};

export async function ServerFetchPrivateAPISession() {
  const headersList = await headers();
  const results = await getData();

  return (
    <>
      <h2 className="text-xl mx-2">Server Component Fetch Private API</h2>
      <pre className="mx-4 overflow-hidden w-full">
        Cookie: {headersList.get('Cookie')}
      </pre>
      <Suspense
        fallback={
          <div className="text-secondary-content m-2 text-center">
            Loading...
          </div>
        }
      >
        <h1>Fetch Results:</h1>
        <pre className="mx-4 text-wrap">{JSON.stringify(results, null, 2)}</pre>
      </Suspense>
    </>
  );
}
