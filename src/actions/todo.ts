'use server'

import { action } from '@/lib/safe-action'
import getErrorMessage from '@/utils/get-error-message'
import { z } from 'zod'

export const getTodos = action(z.void(), async () => {
  await new Promise((resolve) => setTimeout(resolve, 4000))
  const res = await fetch(process.env.API_GET_TODOS ?? '', {
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(await getErrorMessage(res))

  const {
    data,
  }: { data: Array<{ id: string; title: string; created_at: string }> } =
    await res.json()

  return data
})
