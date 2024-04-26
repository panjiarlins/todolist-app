'use server'

import { action } from '@/lib/safe-action'
import getErrorMessage from '@/utils/get-error-message'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

export const getTodoItems = action(
  z.object({
    todoId: z.number(),
    sortBy: z.enum(['newest', 'oldest', 'a-z', 'z-a', 'incomplete']).optional(),
  }),
  async ({ todoId, sortBy }) => {
    const res = await fetch(
      `${process.env.API_TODO}/activity-groups/${todoId}`,
      {
        cache: 'no-store',
        next: { tags: ['getTodoItems'] },
      }
    )
    if (!res.ok) throw new Error(await getErrorMessage(res))

    const data = (await res.json()) as {
      id: number
      title: string
      created_at: string
      todo_items: Array<{
        activity_group_id: number
        id: number
        is_active: number
        priority: 'very-low' | 'low' | 'normal' | 'high' | 'very-high'
        title: string
      }>
    }

    switch (sortBy) {
      case 'newest':
        break
      case 'oldest':
        data.todo_items.reverse()
        break
      case 'a-z':
        data.todo_items.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'z-a':
        data.todo_items.sort((a, b) => b.title.localeCompare(a.title))
        break
      case 'incomplete':
        data.todo_items.sort(
          (a, b) => Number(b.is_active) - Number(a.is_active)
        )
        break
    }

    return data
  }
)

export const addTodoItem = action(
  z.object({
    todoId: z.number(),
    title: z.string(),
    priority: z.enum(['very-low', 'low', 'normal', 'high', 'very-high']),
  }),
  async ({ todoId, title, priority }) => {
    const res = await fetch(`${process.env.API_TODO}/todo-items`, {
      method: 'POST',
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        activity_group_id: todoId,
        title,
        priority,
      }),
    })
    if (!res.ok) throw new Error(await getErrorMessage(res))
    revalidateTag('getTodoItems')
  }
)

export const updateTodoItem = action(
  z.object({
    id: z.number(),
    isActive: z.boolean().optional(),
    title: z.string().optional(),
    priority: z
      .enum(['very-low', 'low', 'normal', 'high', 'very-high'])
      .optional(),
  }),
  async ({ id, isActive, title, priority }) => {
    const newData = Object.fromEntries(
      Object.entries({ is_active: Number(isActive), title, priority }).filter(
        ([, v]) => v !== undefined && !Number.isNaN(v)
      )
    )

    const res = await fetch(`${process.env.API_TODO}/todo-items/${id}`, {
      method: 'PATCH',
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData),
    })
    if (!res.ok) throw new Error(await getErrorMessage(res))
    revalidateTag('getTodoItems')
  }
)

export const deleteTodoItem = action(
  z.object({ id: z.number() }),
  async ({ id }) => {
    const res = await fetch(`${process.env.API_TODO}/todo-items/${id}`, {
      method: 'DELETE',
      cache: 'no-store',
    })
    if (!res.ok) throw new Error(await getErrorMessage(res))
    revalidateTag('getTodoItems')
  }
)
