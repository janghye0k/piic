import prisma from '@/shared/libs/prisma';
import { z } from 'zod';

const validation = z.object({ name: z.string(), description: z.string().optional() });

export async function GET() {
  const roles = await prisma.role.findMany();
  return Response.json({ success: true, roles }, { status: 200 });
}

export async function POST(request: Request) {
  const body = await request.json();

  const parsedBody = validation.safeParse(body);
  if (!parsedBody.success) {
    return new Response(`Invalid data provided\n${parsedBody.error.message}`, { status: 400 });
  }

  await prisma.role.create({ data: parsedBody.data });

  return Response.json({ success: true }, { status: 201 });
}
