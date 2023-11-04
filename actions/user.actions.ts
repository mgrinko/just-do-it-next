'use server'

import prisma from '@/utils/db';

export async function getUser(email: string) {
  return prisma.user.findUnique({ where: { email }});
}