'use server'

import prisma from '@/utils/db'
import { Task } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export async function getTasks(listId: number) {
  return prisma.task.findMany({
    where: { listId },
    orderBy: { id: 'asc' },
  })
}

export async function deleteTask(id: number) {
  await prisma.task.delete({ where: { id } })
  revalidatePath('/tasks')
}

export async function updateTask({ id, title, completed }: Task) {
  const task = await prisma.task.update({
    where: { id },
    data: { title, completed },
  })

  revalidatePath('/tasks')
  return task
}

export async function addTask({ title, listId }: Task) {
  const task = await prisma.task.create({
    data: { title, listId },
  })

  revalidatePath('/tasks')
  return task
}
