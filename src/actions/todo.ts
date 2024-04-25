'use server'

import { action } from '@/lib/safe-action'
import getErrorMessage from '@/utils/get-error-message'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

export const getTodos = action(z.void(), async () => {
  const res = await fetch(
    `${process.env.API_TODO}?email=${process.env.NEXT_PUBLIC_EMAIL}`,
    { cache: 'no-store', next: { tags: ['getTodos'] } }
  )
  if (!res.ok) throw new Error(await getErrorMessage(res))

  const {
    data,
  }: { data: Array<{ id: string; title: string; created_at: string }> } =
    await res.json()

  return data
})

export const addTodo = action(
  z.object({ title: z.string(), email: z.string() }),
  async ({ title, email }) => {
    const res = await fetch(`${process.env.API_TODO}`, {
      method: 'POST',
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, email }),
    })
    if (!res.ok) throw new Error(await getErrorMessage(res))
    revalidateTag('getTodos')
  }
)
