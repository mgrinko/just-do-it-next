'use server'

import { getAppServerSession } from '@/utils/authOptions'
import prisma from '@/utils/db'
import { revalidatePath } from 'next/cache'
import { getUser } from './user.actions'

export async function getLists(ownerId: string) {
  return prisma.list.findMany({ where: { ownerId } })
}

export async function getListById(listId: number) {
  return prisma.list.findFirst({ where: { id: listId } })
}

export async function deleteList(id: number) {
  await prisma.list.delete({ where: { id } })

  revalidatePath('/lists')
}

export async function createList(data: FormData) {
  const session = await getAppServerSession()
  const user = await getUser(session?.user?.email || '')

  if (!user) return

  const title = data.get('title') as string
  const list = await prisma.list.create({
    data: { title, ownerId: user.id },
  })

  revalidatePath('/lists')

  return list
}
