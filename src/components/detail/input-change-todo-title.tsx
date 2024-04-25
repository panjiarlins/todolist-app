'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { Pencil } from 'lucide-react'

export default function InputChangeTodoTitle() {
  const [isEditing, setIsEditing] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (ref.current && !(ref.current as any).contains(e.target)) {
        setIsEditing(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [ref])

  useEffect(() => {
    if (isEditing) (ref.current as any).focus()
  }, [isEditing])

  return (
    <div className="flex flex-1 flex-row text-3xl font-bold">
      {isEditing ? (
        <input
          defaultValue="test"
          ref={ref}
          className="w-full overflow-auto border-b-2 bg-transparent outline-none"
        />
      ) : (
        <div
          onClick={() => {
            setIsEditing(true)
          }}
        >
          Activity
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
