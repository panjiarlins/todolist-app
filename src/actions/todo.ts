'use server'

import { action } from '@/lib/safe-action'
import getErrorMessage from '@/utils/get-error-message'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

export const getTodos = action(z.void(), async () => {
  const res = await fetch(
    `${process.env.API_TODO}/activity-groups?email=${process.env.NEXT_PUBLIC_EMAIL}`,
    {
      cache: 'no-store',
      next: { tags: ['getTodos'] },
    }
  )
  if (!res.ok) throw new Error(await getErrorMessage(res))

  const {
    data,
  }: { data: Array<{ id: number; title: string; created_at: string }> } =
    await res.json()

  return data
})

export const addTodo = action(
  z.object({ title: z.string(), email: z.string() }),
  async ({ title, email }) => {
    const res = await fetch(`${process.env.API_TODO}/activity-groups`, {
      method: 'POST',
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, email }),
    })
    if (!res.ok) throw new Error(await getErrorMessage(res))
    revalidateTag('getTodos')
  }
)

export const deleteTodo = action(
  z.object({ id: z.number() }),
  async ({ id }) => {
    const res = await fetch(`${process.env.API_TODO}/activity-groups/${id}`, {
      method: 'DELETE',
      cache: 'no-store',
    })
    if (!res.ok) throw new Error(await getErrorMessage(res))
    revalidateTag('getTodos')
  }
)

export const changeTodoTitle = action(
  z.object({ id: z.number(), title: z.string() }),
  async ({ id, title }) => {
    const res = await fetch(`${process.env.API_TODO}/activity-groups/${id}`, {
      method: 'PATCH',
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    })
    if (!res.ok) throw new Error(await getErrorMessage(res))
    revalidateTag('getTodos')
    revalidateTag('getTodoItems')
  }
)
