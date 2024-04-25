'use client'

import { Plus } from 'lucide-react'
import { Button } from '../ui/button'

export default function ButtonAddTodoItem() {
  return (
    <Button
      onClick={async () => {}}
      className="flex w-fit flex-row gap-1 rounded-[45px] p-7"
    >
      <Plus />
      <span className="text-lg font-semibold">Tambah</span>
    </Button>
  )
}
