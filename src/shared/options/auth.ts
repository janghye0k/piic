import { AuthOptions } from 'next-auth';
import NaverProvider from 'next-auth/providers/naver';
import KakaoProvider from 'next-auth/providers/kakao';
import CredentialsProvider from 'next-auth/providers/credentials';
import { z } from 'zod';
import prisma from '@/shared/libs/prisma';

async function getUser(email: string) {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch user with email: ${email}`);
  }
}

export const authOptions: AuthOptions = {
  providers: [
    NaverProvider({
      clientId: process.env.NAVER_CLIEND_ID as string,
      clientSecret: process.env.NAVER_CLIEND_SECRET as string,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIEND_ID as string,
      clientSecret: process.env.KAKAO_CLIEND_SECRET as string,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Email', type: 'email', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const parsedCredentails = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentails.success) return null;

        const user = await getUser(parsedCredentails.data.email);
        if (!user) return null;

        return user;
      },
    }),
  ],
};
