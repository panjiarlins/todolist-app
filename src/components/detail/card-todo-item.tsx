'use client'

import { useMemo } from 'react'
import { Button } from '../ui/button'
import { Pencil } from 'lucide-react'
import ButtonDeleteTodoItem from './button-delete-todo-item'

export default function CardTodoItem({
  id,
  isActive,
  priority,
  title,
}: {
  id: number
  isActive: boolean
  priority: 'very-low' | 'low' | 'normal' | 'high' | 'very-high'
  title: string
}) {
  const priorityColor = useMemo(() => {
    if (priority === 'very-low') return 'rgb(137, 66, 193)'
    if (priority === 'low') return 'rgb(66, 139, 193)'
    if (priority === 'normal') return 'rgb(0, 167, 144)'
    if (priority === 'high') return 'rgb(248, 165, 65)'
    if (priority === 'very-high') return 'rgb(237, 76, 92)'
  }, [priority])

  return (
    <div className="flex flex-row items-center justify-between gap-2 rounded-2xl bg-background px-6 py-5 shadow-lg">
      <div className="flex flex-row items-center gap-6">
        <input type="checkbox" checked={isActive} className="size-6" />
        <div
          className="size-4 rounded-full"
          style={{ backgroundColor: priorityColor }}
        />
        <div className="text-lg font-medium">{title}</div>
        <Button
          onClick={() => {}}
          variant="ghost"
          size="icon"
          className="rounded-full text-muted-foreground"
        >
          <Pencil className="size-4" />
        </Button>
      </div>
      <ButtonDeleteTodoItem id={id} />
    </div>
  )
}