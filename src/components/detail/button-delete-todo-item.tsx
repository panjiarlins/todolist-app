'use client'

import { Trash2 } from 'lucide-react'
import { Button } from '../ui/button'

export default function ButtonDeleteTodoItem({ id }: { id: number }) {
  return (
    <Button
      onClick={() => {}}
      variant="outline"
      size="icon"
      className="rounded-full border-none text-muted-foreground"
    >
      <Trash2 />
    </Button>
  )
}
