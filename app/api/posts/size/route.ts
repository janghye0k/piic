import prisma from '@/shared/libs/prisma';
import { z } from 'zod';

export async function GET() {
  const sizes = await prisma.size.findMany();
  return Response.json({ success: true, sizes }, { status: 200 });
}

const validationCreate = z.object({ name: z.string(), size: z.string(), categoryId: z.number() });

export async function POST(request: Request) {
  const body = await request.json();
  const parsedBody = validationCreate.safeParse(body);

  if (!parsedBody.success) {
    return new Response(`Invalid data provided\n${parsedBody.error.message}`, { status: 400 });
  }

  await prisma.size.create({ data: parsedBody.data });

  return Response.json({ success: true }, { status: 201 });
}
