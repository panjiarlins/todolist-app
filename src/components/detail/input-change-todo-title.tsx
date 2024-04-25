'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { Pencil } from 'lucide-react'
import { changeTodoTitle } from '@/actions/todo'

export default function InputChangeTodoTitle({
  todoId,
  title,
}: {
  todoId: number
  title: string
}) {
  const [newTitle, setNewTitle] = useState(title)
  const [isEditing, setIsEditing] = useState(false)
  const ref = useRef(null)

  const handleOutsideClick = useCallback(
    async (e: MouseEvent) => {
      if (ref.current && !(ref.current as any).contains(e.target)) {
        setIsEditing(false)
        if (title !== newTitle)
          await changeTodoTitle({ id: todoId, title: newTitle })
      }
    },
    [todoId, newTitle, title]
  )

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [handleOutsideClick])

  useEffect(() => {
    if (isEditing) (ref.current as any).focus()
  }, [isEditing])

  return (
    <div className="flex flex-1 flex-row text-3xl font-bold">
      {isEditing ? (
        <input
          value={newTitle}
          onChange={(e) => {
            setNewTitle(e.target.value)
          }}
          ref={ref}
          className="w-full overflow-auto border-b-2 bg-transparent outline-none"
        />
      ) : (
        <div
          onClick={() => {
            setIsEditing(true)
          }}
        >
          {newTitle}
        </div>
      )}

      <Button
        onClick={() => {
          setIsEditing(true)
        }}
        variant="ghost"
        size="icon"
        className="rounded-full text-muted-foreground"
      >
        <Pencil className="size-4" />
      </Button>
    </div>
  )
}
