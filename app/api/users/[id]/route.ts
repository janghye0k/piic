import prisma from '@/shared/libs/prisma';
import { z } from 'zod';

type Params = { params: Record<string, string> };

export async function GET(request: Request, { params }: Params) {
  const id = params.id;

  const user = await prisma.user.findUnique({ where: { id }, omit: { password: true } });

  return Response.json({ success: true, user }, { status: 200 });
}

const validation = z.object({
  username: z.string().optional(),
  birthday: z.date().optional(),
  tall: z.number().optional(),
  weight: z.number().optional(),
  sex: z.string().optional(),
});

export async function PATCH(request: Request, { params }: Params) {
  const body = await request.json();
  const id = params.id;

  const { data, success, error } = validation.safeParse(body);
  if (!success) {
    return new Response(`Invalid data provided\n${error.message}`, { status: 400 });
  }

  await prisma.user.update({ where: { id }, data });

  return Response.json({ success: true }, { status: 200 });
}
