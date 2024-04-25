'use server'

import { action } from '@/lib/safe-action'
import getErrorMessage from '@/utils/get-error-message'
import { z } from 'zod'

export const getTodoItems = action(
  z.object({ todoId: z.number() }),
  async ({ todoId }) => {
    const res = await fetch(
      `${process.env.API_TODO}/activity-groups/${todoId}`,
      {
        cache: 'no-store',
        next: { tags: ['getTodoItems'] },
      }
    )
    if (!res.ok) throw new Error(await getErrorMessage(res))
    const {
      todo_items: todoItems,
    }: {
      todo_items: Array<{
        activity_group_id: number
        id: number
        is_active: number
        priority: 'very-low' | 'low' | 'normal' | 'high' | 'very-high'
        title: string
      }>
    } = await res.json()

    return todoItems
  }
)
