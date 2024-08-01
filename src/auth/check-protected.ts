import { getServerSession, Session } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function checkProtected(redirectURL: string, session?: Session | null) {
  if (session === undefined) {
    session = await getServerSession();
  }
  if (!session || !session.user) redirect(redirectURL);
}
