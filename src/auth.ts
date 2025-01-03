import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const allUsers: User[] = [
          {
            id: 'abcdefgh',
            name: 'Jim Dandy',
            email: 'jim@example.com',
          },
          {
            id: 'ijklmnop',
            name: 'Mike Handy',
            email: 'mike@example.com',
          },
        ];

        const user = allUsers.find(
          (u) =>
            u.email === credentials.email && '1234' === credentials.password
        );

        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error('Invalid credentials.');
        }

        // return user object with their profile data
        return user;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  debug: true,
  callbacks: {
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user?.id;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user.id = token?.sub || user?.id;
      // session.user.role = token.role;
      return Promise.resolve(session);
    },
    authorized: async ({ auth, request }) => {
      if (!request.nextUrl.pathname.includes('/api')) {
        return true;
      }
      return !!auth;
    },
  },
});
