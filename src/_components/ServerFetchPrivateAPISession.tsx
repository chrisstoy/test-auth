import { fetchFromServer } from '@/app/api/api';
import { AuthError } from 'next-auth';
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
  return (
    <>
      <h2 className="text-xl mx-2">Server Component Fetch Private API</h2>
      <Suspense
        fallback={
          <div className="text-secondary-content m-2 text-center">
            Loading...
          </div>
        }
      >
        <Content results={await getData()} />
      </Suspense>
    </>
  );
}

async function Content({ results }: { results: string }) {
  return (
    <pre className="mx-4 text-wrap">{JSON.stringify(results, null, 2)}</pre>
  );
}
