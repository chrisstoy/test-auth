'use client';

import { AuthError } from 'next-auth';
import { useEffect, useState } from 'react';

export function ClientFetchPrivateAPISession() {
  const [results, setResults] = useState('');

  const handleFetch = async () => {
    setResults('Loading...');
    try {
      const response = await fetch('/api/private');
      if (response.status !== 200) {
        throw new AuthError('Unauthorized', { status: response.status });
      }
      const data = await response.json();
      setResults(data);
    } catch (error) {
      if (error instanceof AuthError) {
        setResults(error.message);
        return;
      }
      setResults(`${error}`);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <>
      <h2 className="text-xl mx-2">Client Fetch Private API</h2>
      <button className="rounded-lg bg-blue-500 p-2" onClick={handleFetch}>
        Fetch
      </button>
      <pre className="mx-4 text-wrap">{JSON.stringify(results, null, 2)}</pre>
    </>
  );
}
