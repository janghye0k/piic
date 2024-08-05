import { z } from 'zod';

const validationUpdate = z.object({ id: z.number(), size: z.string(), name: z.string() });

export async function PUT(request: Request) {}
