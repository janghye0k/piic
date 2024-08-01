import { AuthOptions } from 'next-auth';
import NaverProvider from 'next-auth/providers/naver';
import KakaoProvider from 'next-auth/providers/kakao';

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
  ],
};
