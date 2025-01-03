'use client';

import { useEffect, useState } from 'react';

export function ClientFetchPublicAPISession() {
  const [results, setResults] = useState('');

  const handleFetch = async () => {
    setResults('Loading...');
    const response = await fetch('/api/public');
    const data = await response.json();
    setResults(data);
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <>
      <h2 className="text-xl mx-2">Client Fetch Public API</h2>
      <button className="rounded-lg bg-blue-500 p-2" onClick={handleFetch}>
        Fetch
      </button>
      <pre className="mx-4">{JSON.stringify(results, null, 2)}</pre>
    </>
  );
}
