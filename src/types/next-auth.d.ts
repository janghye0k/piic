import type { Role, User as PrismaUser } from '@prisma/client';
import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      role: Role;
    } & PrismaUser;
  }

  interface User extends PrismaUser {}
}
