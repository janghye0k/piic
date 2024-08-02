import prisma from '@/shared/libs/prisma';
import { hash } from 'bcrypt';
import { z } from 'zod';

const validation = z.object({ email: z.string().email(), password: z.string().min(6), name: z.string().min(2) });

export async function GET() {}

export async function POST(request: Request) {
  const body = await request.json();

  const parsedBody = validation.safeParse(body);

  if (!parsedBody.success) {
    return new Response(`Invalid data provided\n${parsedBody.error.message}`, { status: 400 });
  }

  const hashedPassword = await hash(parsedBody.data.password, 10);
  parsedBody.data.password = hashedPassword;

  await prisma.user.create({ data: { ...parsedBody.data, roleId: 1 } });

  // do somthing
  return new Response('user created', { status: 200 });
}