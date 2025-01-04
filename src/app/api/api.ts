'use server';
import { env } from '@/../env.mjs';
import { headers } from 'next/headers';

/**
 * Return the full URL needed to call the API function
 * @param endpoint - the API endpoint
 * @returns full URL
 */
export async function apiUrlFor(endpoint: string) {
  const API_HOST = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : env.API_HOST; // ex: 'http://localhost:3000';
  const API_PATH = env.API_PATH; // ex: '/api';

  return `${API_HOST}${API_PATH}${endpoint}`;
}

export async function fetchFromServer(endpoint: string, options?: RequestInit) {
  const apiUrl = await apiUrlFor(endpoint);
  const headersList = await headers();
  console.log({
    url: apiUrl,
    cookie: headersList.get('Cookie'),
  });
  const requestInit = {
    ...options,
    headers: {
      ...(options?.headers ?? {}),
      Cookie: headersList.get('Cookie') || '',
    },
  };
  return await fetch(apiUrl, requestInit);
}
