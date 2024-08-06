import prisma from '@/shared/libs/prisma';
import { authOptions } from '@/shared/options/auth';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

const validationUpdate = z.object({ size: z.string(), name: z.string() });

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  const parsedBody = validationUpdate.safeParse(body);
  if (!parsedBody.success) {
    return new Response(`Invalid data provided\n${parsedBody.error.message}`, { status: 400 });
  }

  const id = params.id;

  await prisma.size.update({ where: { id: parseInt(id) }, data: parsedBody.data });

  return Response.json({ success: true }, { status: 200 });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const session = await getServerSession(authOptions);
  if (!session || session.user.role.id !== 1) {
    return Response.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  await prisma.size.delete({ where: { id: parseInt(id) } });

  return Response.json({ success: true }, { status: 204 });
}
