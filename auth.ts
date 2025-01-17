import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import { getAdminPin } from './app/lib/google-sheets.action';
 
async function getSystemPin(): Promise<string | undefined> {
  try {
    const user = await getAdminPin();
    return user[0][0];
  } catch (error) {
    console.error('Failed to fetch pin:', error);
    throw new Error('Failed to fetch pin.');
  }
}
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { password } = parsedCredentials.data;
          const correctPin = await getSystemPin();
          if (!correctPin) return null;
          // const passwordsMatch = await bcrypt.compare(password, correctPin);
          const passwordsMatch = password == correctPin;
 
          if (passwordsMatch) return {};
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});