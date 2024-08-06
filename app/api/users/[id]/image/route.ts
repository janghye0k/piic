import prisma from '@/shared/libs/prisma';
import { z } from 'zod';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const body = await request.formData();
  const image = body.get('image');

  if (!image || !(image instanceof File)) {
    return new Response('Image not found', { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    return new Response('User not found', { status: 404 });
  }
  const buffer = Buffer.from(await image.arrayBuffer());
  const filename = image.name.replaceAll(' ', '_');
  await prisma.user.update({ where: { id }, data: { image: 'some/image/link.png' } });
  return new Response(null, { status: 204 });
}
