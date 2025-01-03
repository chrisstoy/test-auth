import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']).optional(),

    VERCEL: z.string().optional(),
    VECEL_ENV: z.enum(['development', 'preview', 'production']).optional(),
    VERCEL_URL: z.string().optional(),

    API_HOST: z.string().url().optional(),
    API_PATH: z.string().min(1),

    AUTH_SECRET:
      process.env.NODE_ENV === 'production' ||
      process.env.VECEL_ENV === 'production'
        ? z.string().min(1)
        : z.string().min(1).optional(),

    AUTH_TRUST_HOST: z.enum(['true', 'false']).optional(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {},

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  // runtimeEnv: {
  //   NODE_ENV: process.env.NODE_ENV,
  //   AUTH_SECRET: process.env.AUTH_SECRET,
  //   AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID,
  //   AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET,
  // },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
